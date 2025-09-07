package database

import (
	"backend/src/models"
	"fmt"
	"log"
	"time"

	"gorm.io/gorm"
)

const CURRENT_SCHEMA_VERSION = "1.0.3"

type SchemaVersion struct {
    ID      uint   `gorm:"primaryKey"`
    Version string `gorm:"uniqueIndex;not null"`
    CreatedAt time.Time `gorm:"autoCreateTime"`
}

type AutoMigrator struct {
    db *gorm.DB
}

func NewAutoMigrator(db *gorm.DB) *AutoMigrator {
    return &AutoMigrator{db: db}
}

func (m *AutoMigrator) RunAutoMigrations() error {
    log.Println("🔄 Starting auto-migrations...")
    
    // 1. Создаем таблицу версий
    if err := m.db.AutoMigrate(&SchemaVersion{}); err != nil {
        return fmt.Errorf("failed to create schema_versions table: %w", err)
    }
    
    // 2. Проверяем текущую версию
    currentVersion, err := m.getCurrentVersion()
    if err != nil {
        return err
    }
    
    if currentVersion == CURRENT_SCHEMA_VERSION {
        log.Printf("✅ Database schema is up to date (v%s)", currentVersion)
        return nil
    }
    
    log.Printf("🔄 Updating schema from v%s to v%s", currentVersion, CURRENT_SCHEMA_VERSION)
    
    // 3. Выполняем автомиграцию всех моделей
    if err := m.migrateAllModels(); err != nil {
        return err
    }
    
    // 4. Обновляем версию
    if err := m.updateVersion(CURRENT_SCHEMA_VERSION); err != nil {
        return err
    }
    
    log.Printf("✅ Schema updated successfully to v%s", CURRENT_SCHEMA_VERSION)
    return nil
}

func (m *AutoMigrator) getCurrentVersion() (string, error) {
    var version SchemaVersion
    err := m.db.Order("created_at desc").First(&version).Error
    
    if err == gorm.ErrRecordNotFound {
        return "0.0.0", nil
    }
    
    if err != nil {
        return "", err
    }
    
    return version.Version, nil
}

func (m *AutoMigrator) migrateAllModels() error {
    // Список всех моделей в правильном порядке (учитывая foreign keys)
    modelsToMigrate := []interface{}{
        &models.User{},
        &models.Invite{},
        // Добавляйте новые модели сюда
    }
    
    for _, model := range modelsToMigrate {
        if err := m.db.AutoMigrate(model); err != nil {
            return fmt.Errorf("failed to migrate %T: %w", model, err)
        }
        log.Printf("✅ Migrated: %T", model)
    }
    
    // Создаем дополнительные индексы
    if err := m.createAdditionalIndexes(); err != nil {
        return err
    }
    
    return nil
}

func (m *AutoMigrator) createAdditionalIndexes() error {
    indexes := []string{
        "CREATE INDEX IF NOT EXISTS idx_users_full_name ON users(first_name, last_name)",
        "CREATE INDEX IF NOT EXISTS idx_users_active ON users(is_active) WHERE is_active = true",
        "CREATE INDEX IF NOT EXISTS idx_invites_expires_at ON invites(expires_at)",
        "CREATE INDEX IF NOT EXISTS idx_invites_unused ON invites(used, expires_at) WHERE used = false",
    }
    
    for _, index := range indexes {
        if err := m.db.Exec(index).Error; err != nil {
            log.Printf("⚠️ Warning: Failed to create index: %s - %v", index, err)
            // Не останавливаемся на ошибках индексов
        }
    }
    
    return nil
}

func (m *AutoMigrator) updateVersion(version string) error {
    return m.db.Create(&SchemaVersion{Version: version}).Error
}

// Для production: проверка совместимости
func (m *AutoMigrator) ValidateSchemaCompatibility() error {
    // Проверяем критические изменения схемы
    var tableCount int64
    m.db.Raw("SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public'").Scan(&tableCount)
    
    if tableCount == 0 {
        log.Println("📊 Fresh database detected")
        return nil
    }
    
    // Проверяем наличие критических таблиц
    requiredTables := []string{"users", "invites"}
    for _, table := range requiredTables {
        if !m.db.Migrator().HasTable(table) {
            return fmt.Errorf("critical table missing: %s", table)
        }
    }
    
    log.Println("✅ Schema compatibility validated")
    return nil
}