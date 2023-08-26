CREATE POLICY "Enable read access for all users" ON "public"."songs"
AS PERMISSIVE FOR SELECT
                             TO public
                             USING (true)
