import mongoose, { HydratedDocument, Model } from 'mongoose';

interface Likes extends mongoose.Document {
  slug: string,
  count: number
}

type LikesMethods = {
  logCount(): string;
}

type LikesModel = Model<Likes, {}, LikesMethods>

const likesSchema = new mongoose.Schema<Likes, LikesModel, LikesMethods>({
  slug: String,
  count: Number,
});

likesSchema.method('logCount', function logCount() {
  console.log(this.count)
})

export default mongoose.models.Likes as Model<Likes, LikesModel, LikesMethods> || mongoose.model<Likes, LikesModel>('Likes', likesSchema);

