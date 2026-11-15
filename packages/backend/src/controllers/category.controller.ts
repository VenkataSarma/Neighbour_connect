import { Request, Response, NextFunction } from 'express';
import Category from '../models/Category';
import { sendSuccess, sendError } from '../utils/apiResponse';

export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ sortOrder: 1 });
    return sendSuccess(res, 200, 'Categories retrieved successfully', categories);
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return sendError(res, 404, 'Category not found');
    }
    return sendSuccess(res, 200, 'Category retrieved successfully', category);
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const categoryData = req.body;
    const category = await Category.create(categoryData);
    return sendSuccess(res, 201, 'Category created successfully', category);
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!category) {
      return sendError(res, 404, 'Category not found');
    }
    return sendSuccess(res, 200, 'Category updated successfully', category);
  } catch (error) {
    next(error);
  }
};

export const toggleCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return sendError(res, 404, 'Category not found');
    }
    category.isActive = !category.isActive;
    await category.save();
    return sendSuccess(res, 200, 'Category status toggled successfully', category);
  } catch (error) {
    next(error);
  }
};

export const seedCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const count = await Category.countDocuments();
    if (count > 0) {
      return sendSuccess(res, 200, 'Categories already seeded');
    }

    const initialCategories = [
      {
        name: 'Sports and Fitness',
        slug: 'sports-fitness',
        icon: 'Trophy',
        subcategories: [
          { name: 'Cricket', slug: 'cricket', isActive: true },
          { name: 'Football', slug: 'football', isActive: true },
          { name: 'Badminton', slug: 'badminton', isActive: true },
          { name: 'Running', slug: 'running', isActive: true },
          { name: 'Gym', slug: 'gym', isActive: true },
        ],
        sortOrder: 1,
      },
      {
        name: 'Travel and Exploration',
        slug: 'travel-exploration',
        icon: 'Map',
        subcategories: [
          { name: 'Road Trips', slug: 'road-trips', isActive: true },
          { name: 'Trekking', slug: 'trekking', isActive: true },
          { name: 'Camping', slug: 'camping', isActive: true },
          { name: 'Sightseeing', slug: 'sightseeing', isActive: true },
        ],
        sortOrder: 2,
      },
      {
        name: 'Learning and Education',
        slug: 'learning-education',
        icon: 'BookOpen',
        subcategories: [
          { name: 'Programming', slug: 'programming', isActive: true },
          { name: 'Languages', slug: 'languages', isActive: true },
          { name: 'Study Groups', slug: 'study-groups', isActive: true },
        ],
        sortOrder: 3,
      },
      {
        name: 'Gaming and Entertainment',
        slug: 'gaming-entertainment',
        icon: 'Gamepad2',
        subcategories: [
          { name: 'Online Gaming', slug: 'online-gaming', isActive: true },
          { name: 'Chess', slug: 'chess', isActive: true },
          { name: 'Movies', slug: 'movies', isActive: true },
        ],
        sortOrder: 4,
      },
      {
        name: 'Social and Community',
        slug: 'social-community',
        icon: 'Users',
        subcategories: [
          { name: 'Coffee Meetups', slug: 'coffee-meetups', isActive: true },
          { name: 'Volunteering', slug: 'volunteering', isActive: true },
          { name: 'Book Clubs', slug: 'book-clubs', isActive: true },
        ],
        sortOrder: 5,
      },
      {
        name: 'Hobbies and Creativity',
        slug: 'hobbies-creativity',
        icon: 'Palette',
        subcategories: [
          { name: 'Photography', slug: 'photography', isActive: true },
          { name: 'Painting', slug: 'painting', isActive: true },
          { name: 'Music', slug: 'music', isActive: true },
        ],
        sortOrder: 6,
      },
    ];

    await Category.insertMany(initialCategories);
    return sendSuccess(res, 201, 'Initial categories seeded successfully');
  } catch (error) {
    next(error);
  }
};
