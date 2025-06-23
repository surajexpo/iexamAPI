const mongoose = require("mongoose");
const bcrypt =require('bcrypt');
const userSchema = new mongoose.Schema(
    {
        name: {
          type: String,
        },
        email: {
          type: String,
          require: true,
          unique: true,
          lowercase: true,
          validate: {
            validator: function (v) {
              return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: "{VALUE} is not a valid email",
          },
        },
        mobile_number: {
          type: Number,
        },
        password: {
          type: String,
          required: true,
         
        },
        is_active_email: {
          type: Boolean,
          default: false,
        },
        role: {
          type: String,
          enum: ['user', 'admin', 'moderator'],
          default: "user",
        },
        profileImage: {
            type: String,
            default: 'default.jpg'
          },
          createdAt: {
            type: Date,
            default: Date.now
          },
          address: {
            street: {
              type: String,
              trim: true,
              maxlength: [100, 'Street address cannot exceed 100 characters']
            },
            city: {
              type: String,
              trim: true,
              maxlength: [50, 'City name cannot exceed 50 characters']
            },
            state: {
              type: String,
              trim: true,
              maxlength: [50, 'State name cannot exceed 50 characters']
            },
            zipCode: {
              type: String,
              trim: true,
              maxlength: [20, 'Zip code cannot exceed 20 characters'],
              validate: {
                validator: function(value) {
                  // Basic postal code validation - adjust based on your needs
                  return /^[a-z0-9\- ]+$/i.test(value);
                },
                message: 'Invalid zip code format'
              }
            },
            country: {
              type: String,
              trim: true,
              maxlength: [50, 'Country name cannot exceed 50 characters'],
              default: 'United States'
            },
          },
        term_and_condition: {
          type: Boolean,
          default: true,
        },
        is_active: {
          type: Boolean,
          default: true,
        },
      },
  {
    timestamps: true,
    collection: "users",
    strict: false,
  }
);
userSchema.pre("save", async function (next) {
    const person = this;
    if (!person.isModified("password")) return next();
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(person.password, salt);
      person.password = hashedPassword;
      next();
    } catch (err) {
      return next(err);
    }
  });
  userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
      const isMatch = await bcrypt.compare(candidatePassword, this.password);
      return isMatch;
    } catch (err) {
      return next(err);
    }
  };

const User = mongoose.model("User", userSchema);
module.exports = User;
