const mongoose = require('mongoose');
const { Schema } = mongoose;

const CurrentAffairsSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
   trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  createdBy:{
    type: Schema.Types.ObjectId,
     required:true,
      ref: 'User'

  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  summary: {
    type: String,
    trim: true,
    maxlength: 300, // Short preview
  },
  date: {
    type: Date,
    required: [true, 'Event date is required'],
    index: true, // Improves sorting/filtering
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'Politics',
      'Sports',
      'Science & Technology',
      'Economy',
      'International',
      'Environment',
      'Defence',
      'Awards & Honors',
      'Miscellaneous'
    ],
    default: 'Miscellaneous',
    index: true,
  },
  source: {
    type: String,
    required: [true, 'Source (e.g., BBC, Reuters) is required'],
    trim: true,
  },
  isImportant: {
    type: Boolean,
    default: false,
    index: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  imageUrl: {
    type: String,
    default: '',
  },
  relatedLinks: {
    type: [String],
    default: [],
  },
}, { timestamps: true }); // Auto handles createdAt & updatedAt

module.exports = mongoose.model('CurrentAffairs', CurrentAffairsSchema);
