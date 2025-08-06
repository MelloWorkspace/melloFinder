// Package database implements postgres connection and queries.
package database

import (
	"context"
	"database/sql"

	"github.com/spf13/viper"
	"github.com/uptrace/bun"
	"github.com/uptrace/bun/dialect/pgdialect"
	"github.com/uptrace/bun/driver/pgdriver"
	"github.com/uptrace/bun/extra/bundebug"
)

// DBConn returns a postgres connection pool.
func DBConn() (*bun.DB, error) {
	viper.SetDefault("CONNECTION_STRING", "postgres://postgres:postgres@localhost:5432/finder?sslmode=disable")

	dsn := viper.GetString("CONNECTION_STRING")

	sqldb := sql.OpenDB(pgdriver.NewConnector(pgdriver.WithDSN(dsn)))

	db := bun.NewDB(sqldb, pgdialect.New())

	if err := checkConn(db); err != nil {
		return nil, err
	}

	if viper.GetBool("db_debug") {
		db.AddQueryHook(bundebug.NewQueryHook(bundebug.WithVerbose(true)))
	}

	return db, nil
}

func checkConn(db *bun.DB) error {
	var n int
	return db.NewSelect().ColumnExpr("1").Scan(context.Background(), &n)
}
