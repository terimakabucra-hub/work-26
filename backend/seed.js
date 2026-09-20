import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import News from "./models/News.js";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    await User.deleteMany();
    await News.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("123456", salt);

    const admin = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: hashedPassword,
    });

    console.log("Admin user created: admin@example.com / 123456");

    const sampleNews = [
      {
        title: "Bangladesh Wins Cricket Series Against Australia",
        category: "Sports",
        description:
          "Bangladesh national cricket team secured a historic series win against Australia with a 2-1 victory. The team showed outstanding performance in both batting and bowling departments. Captain praised the young talents for their dedication and hard work throughout the series. Fans across the country celebrated this memorable achievement.",
        image:
          "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800",
      },
      {
        title: "New Technology Park Opens in Dhaka",
        category: "Technology",
        description:
          "A state-of-the-art technology park has been inaugurated in Dhaka, aiming to boost the country's IT sector. The park will host over 100 tech companies and create thousands of jobs for young professionals. Government officials expressed optimism about the project contributing significantly to the national economy and digital transformation goals.",
        image:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
      },
      {
        title: "Economy Shows Strong Growth in Third Quarter",
        category: "Business",
        description:
          "The national economy recorded a 6.5% growth rate in the third quarter, exceeding economists' expectations. Key sectors including garments, agriculture, and remittance contributed to this positive trend. Financial experts predict continued growth momentum in the coming quarters, supported by increased foreign investment and export diversification.",
        image:
          "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
      },
      {
        title: "National Football Team Qualifies for Asian Cup",
        category: "Sports",
        description:
          "In a thrilling match, the national football team qualified for the AFC Asian Cup after a dramatic penalty shootout victory. The goalkeeper made two crucial saves to secure the win. This marks the team's first qualification in over a decade, sparking celebrations among football fans nationwide.",
        image:
          "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800",
      },
      {
        title: "Education Ministry Announces Digital Classroom Initiative",
        category: "Education",
        description:
          "The Ministry of Education has launched a nationwide digital classroom initiative to modernize the education system. Under this program, 10,000 schools will receive smart boards and internet connectivity. Teachers will receive special training to effectively use digital tools in their classrooms, benefiting millions of students.",
        image:
          "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
      },
      {
        title: "New Metro Rail Line to Open Next Month",
        category: "National",
        description:
          "The second line of the Dhaka Metro Rail is set to begin operations next month, connecting more areas of the capital. The new line is expected to reduce traffic congestion significantly and serve over 200,000 passengers daily. Authorities have completed all safety tests and staff training for the launch.",
        image:
          "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800",
      },
      {
        title: "Renovation of Historic Sites Boosts Tourism",
        category: "Travel",
        description:
          "The government has completed renovation work on several historic sites across the country, attracting more tourists. Tourism revenue has increased by 25% compared to last year. Officials plan to continue developing infrastructure to make the country a top travel destination in South Asia.",
        image:
          "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
      },
      {
        title: "Health Ministry Launches Free Vaccination Drive",
        category: "Health",
        description:
          "The Health Ministry has started a nationwide free vaccination campaign targeting rural communities. Mobile medical teams will visit remote areas to ensure everyone has access to essential vaccines. The initiative aims to improve public health and prevent the spread of communicable diseases.",
        image:
          "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
      },
      {
        title: "Film Festival Celebrates Local Cinema",
        category: "Entertainment",
        description:
          "The annual International Film Festival kicked off with a grand opening ceremony, showcasing 50 films from local and international directors. The festival aims to promote the country's film industry and provide a platform for emerging filmmakers. Several awards will be presented in different categories at the closing ceremony.",
        image:
          "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800",
      },
      {
        title: "Renewable Energy Projects Expand Nationwide",
        category: "Technology",
        description:
          "Several new solar and wind energy projects have been approved to expand renewable energy capacity. The projects will add 500 megawatts of clean energy to the national grid. Environmental groups have welcomed the move, calling it a significant step toward sustainable development and reducing carbon emissions.",
        image:
          "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800",
      },
      {
        title: "Farmers Benefit from New Agricultural Subsidies",
        category: "National",
        description:
          "The government has introduced new subsidies for farmers to support modern farming techniques and equipment. The program includes low-interest loans and free training sessions. Agricultural output is expected to increase significantly, ensuring food security and improving rural livelihoods across the country.",
        image:
          "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
      },
      {
        title: "Startup Ecosystem Attracts Record Investment",
        category: "Business",
        description:
          "Local startups have attracted a record $200 million in foreign investment this year, marking a new milestone for the entrepreneurial ecosystem. Fintech and e-commerce sectors received the largest share of funding. Industry experts believe this trend will create more jobs and drive innovation in the coming years.",
        image:
          "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800",
      },
    ];

    const newsWithAuthor = sampleNews.map((n) => ({
      ...n,
      author: admin._id,
      authorName: admin.name,
    }));

    await News.insertMany(newsWithAuthor);
    console.log("12 sample news inserted!");

    process.exit(0);
  } catch (error) {
    console.error(`Seed Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
