CREATE TABLE shopping_items (
 id TEXT PRIMARY KEY NOT NULL,
 name TEXT NOT NULL,
 quantity TEXT NOT NULL DEFAULT '',
 note TEXT NOT NULL DEFAULT '',
 section INTEGER NOT NULL,
 optional INTEGER NOT NULL DEFAULT 0,
 alternative INTEGER NOT NULL DEFAULT 0,
 archived INTEGER NOT NULL DEFAULT 0,
 checked INTEGER NOT NULL DEFAULT 0,
 edited_at INTEGER NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE shopping_operations (id TEXT PRIMARY KEY NOT NULL, applied_at INTEGER NOT NULL);
--> statement-breakpoint
CREATE TABLE shopping_meta (id INTEGER PRIMARY KEY NOT NULL, revision INTEGER NOT NULL DEFAULT 0, updated_at INTEGER NOT NULL DEFAULT 0);
--> statement-breakpoint
CREATE TABLE shopping_markdown (id INTEGER PRIMARY KEY NOT NULL, revision INTEGER NOT NULL, content TEXT NOT NULL);
