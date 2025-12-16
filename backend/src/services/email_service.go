// services/email_service.go
package services

import (
	"backend/src/config"
	"bytes"
	"crypto/tls"
	"fmt"
	"html/template"
	"net"
	"net/smtp"
	"os"
	"path/filepath"
	"time"
)

type EmailService struct {
	config *config.Config
}

type EmailData struct {
	To      string
	Subject string
	Body    string
	IsHTML  bool
}

type InviteEmailData struct {
	Email       string
	InviteToken string
	InviteURL   string
	CompanyName string
}

func NewEmailService(config *config.Config) *EmailService {
	return &EmailService{
		config: config,
	}
}

// Отправка обычного email
func (s *EmailService) SendEmail(to, subject, body string, isHTML bool) error {
	emailData := EmailData{
		To:      to,
		Subject: subject,
		Body:    body,
		IsHTML:  isHTML,
	}
	return s.sendEmail(emailData)
}

// Отправка инвайта с шаблоном
func (s *EmailService) SendInviteEmail(email, token string) error {
	inviteURL := fmt.Sprintf("%s/invite/accept?token=%s", s.config.App.FrontendURL, token)

	data := InviteEmailData{
		Email:       email,
		InviteToken: token,
		InviteURL:   inviteURL,
		CompanyName: s.config.App.Name,
	}

	wd, _ := os.Getwd()
	path := filepath.Join(wd, "src", "templates", "invite.html")

	tmpl, err := template.ParseFiles(path)
	if err != nil {
		panic(err)
	}
	// if err != nil {
	// 	return fmt.Errorf("failed to parse email template: %w", err)
	// }

	var bodyBuffer bytes.Buffer
	if err := tmpl.Execute(&bodyBuffer, data); err != nil {
		return fmt.Errorf("failed to execute email template: %w", err)
	}

	emailData := EmailData{
		To:      email,
		Subject: fmt.Sprintf("Приглашение в %s", s.config.App.Name),
		Body:    bodyBuffer.String(),
		IsHTML:  true,
	}

	return s.sendEmail(emailData)
}

func (s *EmailService) sendEmail(data EmailData) error {
	// Подготовка сообщения
	message := s.buildMessage(data)

	fmt.Printf("EMAIL LOG: %#v\n", *s.config)

	// Аутентификация
	auth := smtp.PlainAuth(
		"",
		s.config.SMTP.Username,
		s.config.SMTP.Password,
		s.config.SMTP.Host,
	)

	// Адрес SMTP сервера
	addr := fmt.Sprintf("%s:%d", s.config.SMTP.Host, s.config.SMTP.Port)

	// Отправка для Gmail/TLS
	if s.config.SMTP.UseTLS {
		return s.sendWithTLS(addr, auth, s.config.SMTP.From, []string{data.To}, message)
	}

	// Обычная отправка (тоже нужен таймаут!)
	return s.sendWithTimeout(addr, auth, s.config.SMTP.From, []string{data.To}, message)
}

// Отправка с TLS и таймаутами
func (s *EmailService) sendWithTLS(addr string, auth smtp.Auth, from string, to []string, msg []byte) error {
	// КРИТИЧНО: добавляем таймаут на соединение
	dialer := &net.Dialer{
		Timeout: 10 * time.Second, // Таймаут подключения
	}

	tlsConfig := &tls.Config{
		InsecureSkipVerify: false,
		ServerName:         s.config.SMTP.Host,
	}

	// Используем DialWithDialer вместо Dial
	conn, err := tls.DialWithDialer(dialer, "tcp", addr, tlsConfig)
	if err != nil {
		return fmt.Errorf("failed to connect with TLS: %w", err)
	}
	defer conn.Close()

	// Устанавливаем дедлайн на все операции (30 секунд на всё)
	if err := conn.SetDeadline(time.Now().Add(30 * time.Second)); err != nil {
		return fmt.Errorf("failed to set deadline: %w", err)
	}

	client, err := smtp.NewClient(conn, s.config.SMTP.Host)
	if err != nil {
		return fmt.Errorf("failed to create SMTP client: %w", err)
	}
	defer client.Quit()

	// Аутентификация
	if err := client.Auth(auth); err != nil {
		return fmt.Errorf("failed to authenticate: %w", err)
	}

	// Установка отправителя
	if err := client.Mail(from); err != nil {
		return fmt.Errorf("failed to set sender: %w", err)
	}

	// Установка получателей
	for _, recipient := range to {
		if err := client.Rcpt(recipient); err != nil {
			return fmt.Errorf("failed to set recipient %s: %w", recipient, err)
		}
	}

	// Отправка сообщения
	writer, err := client.Data()
	if err != nil {
		return fmt.Errorf("failed to get data writer: %w", err)
	}
	defer writer.Close()

	if _, err := writer.Write(msg); err != nil {
		return fmt.Errorf("failed to write message: %w", err)
	}

	return nil
}

// Обычная отправка с таймаутом (без TLS)
func (s *EmailService) sendWithTimeout(addr string, auth smtp.Auth, from string, to []string, msg []byte) error {
	dialer := &net.Dialer{
		Timeout: 10 * time.Second,
	}

	conn, err := dialer.Dial("tcp", addr)
	if err != nil {
		return fmt.Errorf("failed to connect: %w", err)
	}
	defer conn.Close()

	// Устанавливаем дедлайн
	if err := conn.SetDeadline(time.Now().Add(30 * time.Second)); err != nil {
		return fmt.Errorf("failed to set deadline: %w", err)
	}

	client, err := smtp.NewClient(conn, s.config.SMTP.Host)
	if err != nil {
		return fmt.Errorf("failed to create SMTP client: %w", err)
	}
	defer client.Quit()

	// Аутентификация
	if err := client.Auth(auth); err != nil {
		return fmt.Errorf("failed to authenticate: %w", err)
	}

	// Установка отправителя
	if err := client.Mail(from); err != nil {
		return fmt.Errorf("failed to set sender: %w", err)
	}

	// Установка получателей
	for _, recipient := range to {
		if err := client.Rcpt(recipient); err != nil {
			return fmt.Errorf("failed to set recipient %s: %w", recipient, err)
		}
	}

	// Отправка сообщения
	writer, err := client.Data()
	if err != nil {
		return fmt.Errorf("failed to get data writer: %w", err)
	}
	defer writer.Close()

	if _, err := writer.Write(msg); err != nil {
		return fmt.Errorf("failed to write message: %w", err)
	}

	return nil
}

func (s *EmailService) buildMessage(data EmailData) []byte {
	var message bytes.Buffer

	message.WriteString(fmt.Sprintf("From: %s\r\n", s.config.SMTP.From))
	message.WriteString(fmt.Sprintf("To: %s\r\n", data.To))
	message.WriteString(fmt.Sprintf("Subject: %s\r\n", data.Subject))

	if data.IsHTML {
		message.WriteString("MIME-Version: 1.0\r\n")
		message.WriteString("Content-Type: text/html; charset=UTF-8\r\n")
	} else {
		message.WriteString("Content-Type: text/plain; charset=UTF-8\r\n")
	}

	message.WriteString("\r\n")
	message.WriteString(data.Body)

	return message.Bytes()
}
