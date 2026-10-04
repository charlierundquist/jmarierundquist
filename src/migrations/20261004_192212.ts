import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`reset_password_requested_at\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric,
  	\`sizes_thumbnail_url\` text,
  	\`sizes_thumbnail_width\` numeric,
  	\`sizes_thumbnail_height\` numeric,
  	\`sizes_thumbnail_mime_type\` text,
  	\`sizes_thumbnail_filesize\` numeric,
  	\`sizes_thumbnail_filename\` text,
  	\`sizes_square_url\` text,
  	\`sizes_square_width\` numeric,
  	\`sizes_square_height\` numeric,
  	\`sizes_square_mime_type\` text,
  	\`sizes_square_filesize\` numeric,
  	\`sizes_square_filename\` text,
  	\`sizes_small_url\` text,
  	\`sizes_small_width\` numeric,
  	\`sizes_small_height\` numeric,
  	\`sizes_small_mime_type\` text,
  	\`sizes_small_filesize\` numeric,
  	\`sizes_small_filename\` text,
  	\`sizes_medium_url\` text,
  	\`sizes_medium_width\` numeric,
  	\`sizes_medium_height\` numeric,
  	\`sizes_medium_mime_type\` text,
  	\`sizes_medium_filesize\` numeric,
  	\`sizes_medium_filename\` text,
  	\`sizes_large_url\` text,
  	\`sizes_large_width\` numeric,
  	\`sizes_large_height\` numeric,
  	\`sizes_large_mime_type\` text,
  	\`sizes_large_filesize\` numeric,
  	\`sizes_large_filename\` text,
  	\`sizes_xlarge_url\` text,
  	\`sizes_xlarge_width\` numeric,
  	\`sizes_xlarge_height\` numeric,
  	\`sizes_xlarge_mime_type\` text,
  	\`sizes_xlarge_filesize\` numeric,
  	\`sizes_xlarge_filename\` text,
  	\`sizes_og_url\` text,
  	\`sizes_og_width\` numeric,
  	\`sizes_og_height\` numeric,
  	\`sizes_og_mime_type\` text,
  	\`sizes_og_filesize\` numeric,
  	\`sizes_og_filename\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_thumbnail_sizes_thumbnail_filename_idx\` ON \`media\` (\`sizes_thumbnail_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_square_sizes_square_filename_idx\` ON \`media\` (\`sizes_square_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_small_sizes_small_filename_idx\` ON \`media\` (\`sizes_small_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_medium_sizes_medium_filename_idx\` ON \`media\` (\`sizes_medium_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_large_sizes_large_filename_idx\` ON \`media\` (\`sizes_large_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_xlarge_sizes_xlarge_filename_idx\` ON \`media\` (\`sizes_xlarge_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_og_sizes_og_filename_idx\` ON \`media\` (\`sizes_og_filename\`);`)
  await db.run(sql`CREATE TABLE \`books_praise\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`reviewer_name\` text NOT NULL,
  	\`reviewer_title\` text,
  	\`reviewer_website_type\` text DEFAULT 'internal',
  	\`reviewer_website_new_tab\` integer,
  	\`reviewer_website_internal_link_id\` integer,
  	\`reviewer_website_external_link\` text,
  	\`reviewer_website_media_link_id\` integer,
  	\`review\` text,
  	FOREIGN KEY (\`reviewer_website_internal_link_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`reviewer_website_media_link_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`books\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`books_praise_order_idx\` ON \`books_praise\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`books_praise_parent_id_idx\` ON \`books_praise\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`books_praise_reviewer_website_reviewer_website_internal__idx\` ON \`books_praise\` (\`reviewer_website_internal_link_id\`);`)
  await db.run(sql`CREATE INDEX \`books_praise_reviewer_website_reviewer_website_media_lin_idx\` ON \`books_praise\` (\`reviewer_website_media_link_id\`);`)
  await db.run(sql`CREATE TABLE \`books_extras\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_new_tab\` integer,
  	\`link_internal_link_id\` integer,
  	\`link_external_link\` text,
  	\`link_media_link_id\` integer,
  	\`link_link_text\` text,
  	\`extra_description\` text,
  	FOREIGN KEY (\`link_internal_link_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_media_link_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`books\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`books_extras_order_idx\` ON \`books_extras\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`books_extras_parent_id_idx\` ON \`books_extras\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`books_extras_link_link_internal_link_idx\` ON \`books_extras\` (\`link_internal_link_id\`);`)
  await db.run(sql`CREATE INDEX \`books_extras_link_link_media_link_idx\` ON \`books_extras\` (\`link_media_link_id\`);`)
  await db.run(sql`CREATE TABLE \`books\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`cover_image_id\` integer,
  	\`title\` text NOT NULL,
  	\`tagline\` text,
  	\`description\` text,
  	\`has_alert\` integer,
  	\`alert_text\` text,
  	\`links_about_page_type\` text DEFAULT 'internal',
  	\`links_about_page_new_tab\` integer,
  	\`links_about_page_internal_link_id\` integer,
  	\`links_about_page_external_link\` text,
  	\`links_about_page_media_link_id\` integer,
  	\`links_about_page_link_text\` text,
  	\`links_direct_sale_page_type\` text DEFAULT 'internal',
  	\`links_direct_sale_page_new_tab\` integer,
  	\`links_direct_sale_page_internal_link_id\` integer,
  	\`links_direct_sale_page_external_link\` text,
  	\`links_direct_sale_page_media_link_id\` integer,
  	\`links_direct_sale_page_link_text\` text,
  	\`links_retailers_page_type\` text DEFAULT 'internal',
  	\`links_retailers_page_new_tab\` integer,
  	\`links_retailers_page_internal_link_id\` integer,
  	\`links_retailers_page_external_link\` text,
  	\`links_retailers_page_media_link_id\` integer,
  	\`links_retailers_page_link_text\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`cover_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`links_about_page_internal_link_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`links_about_page_media_link_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`links_direct_sale_page_internal_link_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`links_direct_sale_page_media_link_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`links_retailers_page_internal_link_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`links_retailers_page_media_link_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`books_cover_image_idx\` ON \`books\` (\`cover_image_id\`);`)
  await db.run(sql`CREATE INDEX \`books_links_about_page_links_about_page_internal_link_idx\` ON \`books\` (\`links_about_page_internal_link_id\`);`)
  await db.run(sql`CREATE INDEX \`books_links_about_page_links_about_page_media_link_idx\` ON \`books\` (\`links_about_page_media_link_id\`);`)
  await db.run(sql`CREATE INDEX \`books_links_direct_sale_page_links_direct_sale_page_inte_idx\` ON \`books\` (\`links_direct_sale_page_internal_link_id\`);`)
  await db.run(sql`CREATE INDEX \`books_links_direct_sale_page_links_direct_sale_page_medi_idx\` ON \`books\` (\`links_direct_sale_page_media_link_id\`);`)
  await db.run(sql`CREATE INDEX \`books_links_retailers_page_links_retailers_page_internal_idx\` ON \`books\` (\`links_retailers_page_internal_link_id\`);`)
  await db.run(sql`CREATE INDEX \`books_links_retailers_page_links_retailers_page_media_li_idx\` ON \`books\` (\`links_retailers_page_media_link_id\`);`)
  await db.run(sql`CREATE INDEX \`books_updated_at_idx\` ON \`books\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`books_created_at_idx\` ON \`books\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`pages_hero_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_new_tab\` integer,
  	\`link_internal_link_id\` integer,
  	\`link_external_link\` text,
  	\`link_media_link_id\` integer,
  	\`link_link_text\` text,
  	FOREIGN KEY (\`link_internal_link_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_media_link_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_hero_links_order_idx\` ON \`pages_hero_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_hero_links_parent_id_idx\` ON \`pages_hero_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_hero_links_link_link_internal_link_idx\` ON \`pages_hero_links\` (\`link_internal_link_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_hero_links_link_link_media_link_idx\` ON \`pages_hero_links\` (\`link_media_link_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_short_content_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_new_tab\` integer,
  	\`link_internal_link_id\` integer,
  	\`link_external_link\` text,
  	\`link_media_link_id\` integer,
  	\`link_link_text\` text,
  	FOREIGN KEY (\`link_internal_link_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_media_link_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_short_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_short_content_links_order_idx\` ON \`pages_blocks_short_content_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_short_content_links_parent_id_idx\` ON \`pages_blocks_short_content_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_short_content_links_link_link_internal_link_idx\` ON \`pages_blocks_short_content_links\` (\`link_internal_link_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_short_content_links_link_link_media_link_idx\` ON \`pages_blocks_short_content_links\` (\`link_media_link_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_short_content\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`image_location\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`content\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_short_content_order_idx\` ON \`pages_blocks_short_content\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_short_content_parent_id_idx\` ON \`pages_blocks_short_content\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_short_content_path_idx\` ON \`pages_blocks_short_content\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_short_content_image_idx\` ON \`pages_blocks_short_content\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_long_content_one_column_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_new_tab\` integer,
  	\`link_internal_link_id\` integer,
  	\`link_external_link\` text,
  	\`link_media_link_id\` integer,
  	\`link_link_text\` text,
  	FOREIGN KEY (\`link_internal_link_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_media_link_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_long_content_one_column\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_long_content_one_column_links_order_idx\` ON \`pages_blocks_long_content_one_column_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_long_content_one_column_links_parent_id_idx\` ON \`pages_blocks_long_content_one_column_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_long_content_one_column_links_link_link_int_idx\` ON \`pages_blocks_long_content_one_column_links\` (\`link_internal_link_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_long_content_one_column_links_link_link_med_idx\` ON \`pages_blocks_long_content_one_column_links\` (\`link_media_link_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_long_content_one_column\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`display_image\` integer DEFAULT false NOT NULL,
  	\`image_id\` integer,
  	\`title\` text NOT NULL,
  	\`subtitle\` text,
  	\`content\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_long_content_one_column_order_idx\` ON \`pages_blocks_long_content_one_column\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_long_content_one_column_parent_id_idx\` ON \`pages_blocks_long_content_one_column\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_long_content_one_column_path_idx\` ON \`pages_blocks_long_content_one_column\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_long_content_one_column_image_idx\` ON \`pages_blocks_long_content_one_column\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_long_content_two_column_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_new_tab\` integer,
  	\`link_internal_link_id\` integer,
  	\`link_external_link\` text,
  	\`link_media_link_id\` integer,
  	\`link_link_text\` text,
  	FOREIGN KEY (\`link_internal_link_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_media_link_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_long_content_two_column\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_long_content_two_column_links_order_idx\` ON \`pages_blocks_long_content_two_column_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_long_content_two_column_links_parent_id_idx\` ON \`pages_blocks_long_content_two_column_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_long_content_two_column_links_link_link_int_idx\` ON \`pages_blocks_long_content_two_column_links\` (\`link_internal_link_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_long_content_two_column_links_link_link_med_idx\` ON \`pages_blocks_long_content_two_column_links\` (\`link_media_link_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_long_content_two_column\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`image_location\` text DEFAULT 'left' NOT NULL,
  	\`title\` text NOT NULL,
  	\`subtitle\` text,
  	\`content\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_long_content_two_column_order_idx\` ON \`pages_blocks_long_content_two_column\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_long_content_two_column_parent_id_idx\` ON \`pages_blocks_long_content_two_column\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_long_content_two_column_path_idx\` ON \`pages_blocks_long_content_two_column\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_long_content_two_column_image_idx\` ON \`pages_blocks_long_content_two_column\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_book_showcase\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`book_select_id\` integer NOT NULL,
  	\`image_location\` text DEFAULT 'left',
  	\`toggle_description\` text DEFAULT 'praise',
  	\`block_name\` text,
  	FOREIGN KEY (\`book_select_id\`) REFERENCES \`books\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_book_showcase_order_idx\` ON \`pages_blocks_book_showcase\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_book_showcase_parent_id_idx\` ON \`pages_blocks_book_showcase\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_book_showcase_path_idx\` ON \`pages_blocks_book_showcase\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_book_showcase_book_select_idx\` ON \`pages_blocks_book_showcase\` (\`book_select_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_praise_display\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`book_select_id\` integer NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`book_select_id\`) REFERENCES \`books\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_praise_display_order_idx\` ON \`pages_blocks_praise_display\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_praise_display_parent_id_idx\` ON \`pages_blocks_praise_display\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_praise_display_path_idx\` ON \`pages_blocks_praise_display\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_praise_display_book_select_idx\` ON \`pages_blocks_praise_display\` (\`book_select_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_carousel\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`autoscroll\` integer DEFAULT true NOT NULL,
  	\`autoscroll_speed\` numeric DEFAULT 5,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_carousel_order_idx\` ON \`pages_blocks_carousel\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_carousel_parent_id_idx\` ON \`pages_blocks_carousel\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_carousel_path_idx\` ON \`pages_blocks_carousel\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_extras_display\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`book_select_id\` integer NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`book_select_id\`) REFERENCES \`books\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_extras_display_order_idx\` ON \`pages_blocks_extras_display\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_extras_display_parent_id_idx\` ON \`pages_blocks_extras_display\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_extras_display_path_idx\` ON \`pages_blocks_extras_display\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_extras_display_book_select_idx\` ON \`pages_blocks_extras_display\` (\`book_select_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_book_details\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`book_select_id\` integer NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`book_select_id\`) REFERENCES \`books\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_book_details_order_idx\` ON \`pages_blocks_book_details\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_book_details_parent_id_idx\` ON \`pages_blocks_book_details\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_book_details_path_idx\` ON \`pages_blocks_book_details\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_book_details_book_select_idx\` ON \`pages_blocks_book_details\` (\`book_select_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_list_grid_item\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`content\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_list_grid_item_order_idx\` ON \`pages_blocks_list_grid_item\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_list_grid_item_parent_id_idx\` ON \`pages_blocks_list_grid_item\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_list_grid_item_path_idx\` ON \`pages_blocks_list_grid_item\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_list_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_list_grid_order_idx\` ON \`pages_blocks_list_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_list_grid_parent_id_idx\` ON \`pages_blocks_list_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_list_grid_path_idx\` ON \`pages_blocks_list_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_contact_form\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`has_leading_content\` integer,
  	\`leading_title\` text,
  	\`leading_content\` text,
  	\`form_select_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`form_select_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_form_order_idx\` ON \`pages_blocks_contact_form\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_form_parent_id_idx\` ON \`pages_blocks_contact_form\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_form_path_idx\` ON \`pages_blocks_contact_form\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_form_form_select_idx\` ON \`pages_blocks_contact_form\` (\`form_select_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_image_link\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_select_id\` integer NOT NULL,
  	\`has_hover_info\` integer,
  	\`hover_info_hover_title\` text,
  	\`hover_info_hover_content\` text,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_new_tab\` integer,
  	\`link_internal_link_id\` integer,
  	\`link_external_link\` text,
  	\`link_media_link_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_select_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_internal_link_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_media_link_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_image_link_order_idx\` ON \`pages_blocks_image_link\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_image_link_parent_id_idx\` ON \`pages_blocks_image_link\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_image_link_path_idx\` ON \`pages_blocks_image_link\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_image_link_image_select_idx\` ON \`pages_blocks_image_link\` (\`image_select_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_image_link_link_link_internal_link_idx\` ON \`pages_blocks_image_link\` (\`link_internal_link_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_image_link_link_link_media_link_idx\` ON \`pages_blocks_image_link\` (\`link_media_link_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_image_no_link\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_select_id\` integer NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_select_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_image_no_link_order_idx\` ON \`pages_blocks_image_no_link\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_image_no_link_parent_id_idx\` ON \`pages_blocks_image_no_link\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_image_no_link_path_idx\` ON \`pages_blocks_image_no_link\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_image_no_link_image_select_idx\` ON \`pages_blocks_image_no_link\` (\`image_select_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_image_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`subtitle\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_image_grid_order_idx\` ON \`pages_blocks_image_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_image_grid_parent_id_idx\` ON \`pages_blocks_image_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_image_grid_path_idx\` ON \`pages_blocks_image_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`hero_size\` text DEFAULT 'small' NOT NULL,
  	\`hero_background_image_id\` integer,
  	\`hero_header\` text NOT NULL,
  	\`hero_subheader\` text,
  	\`folder_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`hero_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`folder_id\`) REFERENCES \`payload_folders\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_hero_hero_background_image_idx\` ON \`pages\` (\`hero_background_image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_folder_idx\` ON \`pages\` (\`folder_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_checkbox\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`required\` integer,
  	\`default_value\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_checkbox_order_idx\` ON \`forms_blocks_checkbox\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_checkbox_parent_id_idx\` ON \`forms_blocks_checkbox\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_checkbox_path_idx\` ON \`forms_blocks_checkbox\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_country\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_country_order_idx\` ON \`forms_blocks_country\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_country_parent_id_idx\` ON \`forms_blocks_country\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_country_path_idx\` ON \`forms_blocks_country\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_email\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_email_order_idx\` ON \`forms_blocks_email\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_email_parent_id_idx\` ON \`forms_blocks_email\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_email_path_idx\` ON \`forms_blocks_email\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_message\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`message\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_message_order_idx\` ON \`forms_blocks_message\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_message_parent_id_idx\` ON \`forms_blocks_message\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_message_path_idx\` ON \`forms_blocks_message\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_number\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`default_value\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_number_order_idx\` ON \`forms_blocks_number\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_number_parent_id_idx\` ON \`forms_blocks_number\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_number_path_idx\` ON \`forms_blocks_number\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_select_options\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`value\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_select\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_options_order_idx\` ON \`forms_blocks_select_options\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_options_parent_id_idx\` ON \`forms_blocks_select_options\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_select\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`default_value\` text,
  	\`placeholder\` text,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_order_idx\` ON \`forms_blocks_select\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_parent_id_idx\` ON \`forms_blocks_select\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_path_idx\` ON \`forms_blocks_select\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_state\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_state_order_idx\` ON \`forms_blocks_state\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_state_parent_id_idx\` ON \`forms_blocks_state\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_state_path_idx\` ON \`forms_blocks_state\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`default_value\` text,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_text_order_idx\` ON \`forms_blocks_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_text_parent_id_idx\` ON \`forms_blocks_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_text_path_idx\` ON \`forms_blocks_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_textarea\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`default_value\` text,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_textarea_order_idx\` ON \`forms_blocks_textarea\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_textarea_parent_id_idx\` ON \`forms_blocks_textarea\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_textarea_path_idx\` ON \`forms_blocks_textarea\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_emails\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`email_to\` text,
  	\`cc\` text,
  	\`bcc\` text,
  	\`reply_to\` text,
  	\`email_from\` text,
  	\`subject\` text DEFAULT 'You''ve received a new message.' NOT NULL,
  	\`message\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_emails_order_idx\` ON \`forms_emails\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_emails_parent_id_idx\` ON \`forms_emails\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`submit_button_label\` text,
  	\`confirmation_type\` text DEFAULT 'message',
  	\`confirmation_message\` text,
  	\`redirect_url\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_updated_at_idx\` ON \`forms\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`forms_created_at_idx\` ON \`forms\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`form_submissions_submission_data\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`field\` text NOT NULL,
  	\`value\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`form_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`form_submissions_submission_data_order_idx\` ON \`form_submissions_submission_data\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_submission_data_parent_id_idx\` ON \`form_submissions_submission_data\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`form_submissions\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`form_id\` integer NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`form_submissions_form_idx\` ON \`form_submissions\` (\`form_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_updated_at_idx\` ON \`form_submissions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_created_at_idx\` ON \`form_submissions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_folders_folder_type\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_folders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_folders_folder_type_order_idx\` ON \`payload_folders_folder_type\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_folders_folder_type_parent_idx\` ON \`payload_folders_folder_type\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_folders\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`folder_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`folder_id\`) REFERENCES \`payload_folders\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_folders_name_idx\` ON \`payload_folders\` (\`name\`);`)
  await db.run(sql`CREATE INDEX \`payload_folders_folder_idx\` ON \`payload_folders\` (\`folder_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_folders_updated_at_idx\` ON \`payload_folders\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_folders_created_at_idx\` ON \`payload_folders\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`books_id\` integer,
  	\`pages_id\` integer,
  	\`forms_id\` integer,
  	\`form_submissions_id\` integer,
  	\`payload_folders_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`books_id\`) REFERENCES \`books\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`forms_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`form_submissions_id\`) REFERENCES \`form_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`payload_folders_id\`) REFERENCES \`payload_folders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_books_id_idx\` ON \`payload_locked_documents_rels\` (\`books_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_forms_id_idx\` ON \`payload_locked_documents_rels\` (\`forms_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_form_submissions_id_idx\` ON \`payload_locked_documents_rels\` (\`form_submissions_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_payload_folders_id_idx\` ON \`payload_locked_documents_rels\` (\`payload_folders_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`header_links_dropdown_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_new_tab\` integer,
  	\`link_internal_link_id\` integer,
  	\`link_external_link\` text,
  	\`link_media_link_id\` integer,
  	\`link_link_text\` text,
  	FOREIGN KEY (\`link_internal_link_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_media_link_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`header_links_dropdown_links_order_idx\` ON \`header_links_dropdown_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`header_links_dropdown_links_parent_id_idx\` ON \`header_links_dropdown_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`header_links_dropdown_links_link_link_internal_link_idx\` ON \`header_links_dropdown_links\` (\`link_internal_link_id\`);`)
  await db.run(sql`CREATE INDEX \`header_links_dropdown_links_link_link_media_link_idx\` ON \`header_links_dropdown_links\` (\`link_media_link_id\`);`)
  await db.run(sql`CREATE TABLE \`header_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_new_tab\` integer,
  	\`link_internal_link_id\` integer,
  	\`link_external_link\` text,
  	\`link_media_link_id\` integer,
  	\`link_link_text\` text,
  	\`has_dropdown\` integer,
  	FOREIGN KEY (\`link_internal_link_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_media_link_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`header_links_order_idx\` ON \`header_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`header_links_parent_id_idx\` ON \`header_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`header_links_link_link_internal_link_idx\` ON \`header_links\` (\`link_internal_link_id\`);`)
  await db.run(sql`CREATE INDEX \`header_links_link_link_media_link_idx\` ON \`header_links\` (\`link_media_link_id\`);`)
  await db.run(sql`CREATE TABLE \`header\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`footer_quick_links_custom_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_new_tab\` integer,
  	\`link_internal_link_id\` integer,
  	\`link_external_link\` text,
  	\`link_media_link_id\` integer,
  	\`link_link_text\` text,
  	FOREIGN KEY (\`link_internal_link_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_media_link_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_quick_links_custom_links_order_idx\` ON \`footer_quick_links_custom_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_quick_links_custom_links_parent_id_idx\` ON \`footer_quick_links_custom_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`footer_quick_links_custom_links_link_link_internal_link_idx\` ON \`footer_quick_links_custom_links\` (\`link_internal_link_id\`);`)
  await db.run(sql`CREATE INDEX \`footer_quick_links_custom_links_link_link_media_link_idx\` ON \`footer_quick_links_custom_links\` (\`link_media_link_id\`);`)
  await db.run(sql`CREATE TABLE \`footer\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`quick_links_match_header\` integer DEFAULT false NOT NULL,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_new_tab\` integer,
  	\`link_internal_link_id\` integer,
  	\`link_external_link\` text,
  	\`link_media_link_id\` integer,
  	\`link_link_text\` text,
  	\`extra_info\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`link_internal_link_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_media_link_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_link_link_internal_link_idx\` ON \`footer\` (\`link_internal_link_id\`);`)
  await db.run(sql`CREATE INDEX \`footer_link_link_media_link_idx\` ON \`footer\` (\`link_media_link_id\`);`)
  await db.run(sql`CREATE TABLE \`site_details_social_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`platform\` text NOT NULL,
  	\`profile_link\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_details\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_details_social_links_order_idx\` ON \`site_details_social_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_details_social_links_parent_id_idx\` ON \`site_details_social_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_details_cta_block_cta_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_new_tab\` integer,
  	\`link_internal_link_id\` integer,
  	\`link_external_link\` text,
  	\`link_media_link_id\` integer,
  	\`link_link_text\` text,
  	FOREIGN KEY (\`link_internal_link_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_media_link_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_details\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_details_cta_block_cta_links_order_idx\` ON \`site_details_cta_block_cta_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_details_cta_block_cta_links_parent_id_idx\` ON \`site_details_cta_block_cta_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`site_details_cta_block_cta_links_link_link_internal_link_idx\` ON \`site_details_cta_block_cta_links\` (\`link_internal_link_id\`);`)
  await db.run(sql`CREATE INDEX \`site_details_cta_block_cta_links_link_link_media_link_idx\` ON \`site_details_cta_block_cta_links\` (\`link_media_link_id\`);`)
  await db.run(sql`CREATE TABLE \`site_details\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`logo_image_id\` integer NOT NULL,
  	\`site_title\` text NOT NULL,
  	\`tagline\` text NOT NULL,
  	\`cta_block_cta_title\` text,
  	\`cta_block_cta_subtitle\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`logo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`site_details_logo_image_idx\` ON \`site_details\` (\`logo_image_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`books_praise\`;`)
  await db.run(sql`DROP TABLE \`books_extras\`;`)
  await db.run(sql`DROP TABLE \`books\`;`)
  await db.run(sql`DROP TABLE \`pages_hero_links\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_short_content_links\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_short_content\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_long_content_one_column_links\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_long_content_one_column\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_long_content_two_column_links\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_long_content_two_column\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_book_showcase\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_praise_display\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_carousel\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_extras_display\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_book_details\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_list_grid_item\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_list_grid\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_contact_form\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_image_link\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_image_no_link\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_image_grid\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_checkbox\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_country\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_email\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_message\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_number\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_select_options\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_select\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_state\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_text\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_textarea\`;`)
  await db.run(sql`DROP TABLE \`forms_emails\`;`)
  await db.run(sql`DROP TABLE \`forms\`;`)
  await db.run(sql`DROP TABLE \`form_submissions_submission_data\`;`)
  await db.run(sql`DROP TABLE \`form_submissions\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_folders_folder_type\`;`)
  await db.run(sql`DROP TABLE \`payload_folders\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`header_links_dropdown_links\`;`)
  await db.run(sql`DROP TABLE \`header_links\`;`)
  await db.run(sql`DROP TABLE \`header\`;`)
  await db.run(sql`DROP TABLE \`footer_quick_links_custom_links\`;`)
  await db.run(sql`DROP TABLE \`footer\`;`)
  await db.run(sql`DROP TABLE \`site_details_social_links\`;`)
  await db.run(sql`DROP TABLE \`site_details_cta_block_cta_links\`;`)
  await db.run(sql`DROP TABLE \`site_details\`;`)
}
