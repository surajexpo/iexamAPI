const mongoose = require('mongoose');
const { Schema } = mongoose;
// Question & Answer Schema
const qaSchema = new Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    lastUpdated: { type: Date, default: Date.now }
  }, { _id: true });
  const headingSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    qaPairs: [qaSchema],  // Nested Q&A pairs
    createdAt: { type: Date, default: Date.now }
  }, { _id: true });

  const subjectSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    headings: [headingSchema],  // Nested headings
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  // Add timestamp update middleware
subjectSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
  });
  // Create the model
const GkSubject = mongoose.model('GkSubject', subjectSchema);
module.exports = GkSubject;
  
  