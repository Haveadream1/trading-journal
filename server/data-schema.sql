-- Table: trades
-- Description: define structure to store trade objects with their attributes

CREATE TABLE trades (
  -- auto-incrementing primary key following PostgreSQL standard
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name trades_id_seq),
  trade_date DATE NOT NULL,
  asset VARCHAR(25) NOT NULL,
  direction VARCHAR(25) NOT NULL,
  outcome VARCHAR(25) NOT NULL,
  net_pnl DECIMAL(10, 2) NOT NULL
);