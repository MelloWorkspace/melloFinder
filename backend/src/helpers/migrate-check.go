package helpers

import (
	"backend/src/config"
	"backend/src/models"
	"fmt"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func main() {
    cfg := config.Load()
    
    dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=%s",
        cfg.Database.Host, cfg.Database.User, cfg.Database.Password,
        cfg.Database.Name, cfg.Database.Port, cfg.Database.SSLMode)
    
    db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
        Logger: logger.Default.LogMode(logger.Info),
        DryRun: true, // Включаем dry run
    })
    if err != nil {
        log.Fatal(err)
    }
    
    fmt.Println("🔍 Checking migrations (dry run)...")
    
    // Это покажет SQL, который будет выполнен
    err = db.AutoMigrate(&models.User{}, &models.Invite{})
    if err != nil {
        log.Fatal(err)
    }
    
    fmt.Println("✅ Check complete")
}