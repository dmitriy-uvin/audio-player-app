create table
    public.songs (
                     id bigint generated by default as identity,
                     title character varying not null,
                     song_path character varying not null,
                     image_path character varying null,
                     author character varying not null,
                     created_at timestamp with time zone not null default now(),
                     user_id uuid null,
                     constraint songs_pkey primary key (id),
                     constraint songs_user_id_fkey foreign key (user_id) references users (id) on delete cascade
) tablespace pg_default;