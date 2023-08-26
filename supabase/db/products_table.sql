create table
    public.products (
                        id text not null,
                        active boolean null,
                        name text null,
                        description text null,
                        image text null,
                        metadata jsonb null,
                        constraint products_pkey primary key (id)
) tablespace pg_default;