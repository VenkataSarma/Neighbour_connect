import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ISubcategory {
  name: string;
  slug: string;
  isActive: boolean;
}

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  icon: string;
  subcategories: ISubcategory[];
  isActive: boolean;
  sortOrder: number;
  createdBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const subcategorySchema = new Schema<ISubcategory>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, lowercase: true, trim: true },
    isActive: { type: Boolean, default: true },
  },
  { _id: true }
);

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true,
      trim: true,
      maxlength: 100,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: { type: String, maxlength: 500 },
    icon: { type: String, default: 'tag' },
    subcategories: { type: [subcategorySchema], default: [] },
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

categorySchema.index({ slug: 1 });
categorySchema.index({ isActive: 1, sortOrder: 1 });

const Category = mongoose.model<ICategory>('Category', categorySchema);
export default Category;
