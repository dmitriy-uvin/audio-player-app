CREATE POLICY "Enable read access for all users" ON "public"."liked_songs"
AS PERMISSIVE FOR SELECT
                             TO public
                             USING (true)
