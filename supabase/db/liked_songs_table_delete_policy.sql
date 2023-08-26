CREATE POLICY "Enable delete for users based on user_id" ON "public"."liked_songs"
AS PERMISSIVE FOR DELETE
TO public
USING (auth.uid() = user_id)
