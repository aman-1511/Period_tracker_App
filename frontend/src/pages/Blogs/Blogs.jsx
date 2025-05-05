import React from 'react';
import './Blogs.css';
import Navbar from '../../components/Navbar/Navbar';
import womanImg from '../../assets/woman.jpg';
import foodImg from '../../assets/real-food-pyramid-assortment-top-view.jpg';
import dumbbellsImg from '../../assets/medium-shot-woman-practicing-with-dumbbells.jpg';
import stressedImg from '../../assets/nervous-stressed-female-student-feeling-headache-studying-cafe.jpg';
import coupleImg from '../../assets/couple-having-conversation-moment.jpg';
import phytoImg from '../../assets/phytotherapy-products-arrangement-high-angle.jpg';

const Blogs = () => {
 
  const blogPosts = [
    {
      id: 1,
      title: 'Understanding Your Menstrual Cycle Phases',
      excerpt: 'Learn about the four phases of your menstrual cycle and how they affect your body and mind.',
      author: 'Dr. Sarah Johnson',
      date: 'October 15, 2023',
      category: 'Education',
      image: womanImg
    },
    {
      id: 2,
      title: 'Nutrition Tips for PMS Relief',
      excerpt: 'Discover which foods can help alleviate common PMS symptoms and support hormonal balance.',
      author: 'Nutritionist Emma Chen',
      date: 'October 8, 2023',
      category: 'Nutrition',
      image: foodImg
    },
    {
      id: 3,
      title: 'Exercise and Your Cycle: When to Push and When to Rest',
      excerpt: 'How to sync your workout routine with your menstrual cycle for optimal results and recovery.',
      author: 'Fitness Coach Maria Rodriguez',
      date: 'September 29, 2023',
      category: 'Fitness',
      image: dumbbellsImg
    },
    {
      id: 4,
      title: 'The Link Between Stress and Irregular Periods',
      excerpt: 'Understanding how stress impacts your hormones and what you can do to maintain cycle regularity.',
      author: 'Dr. Lisa Patel',
      date: 'September 20, 2023',
      category: 'Health',
      image: stressedImg
    },
    {
      id: 5,
      title: 'Talking to Your Partner About Your Period',
      excerpt: 'Tips for having open, honest conversations about menstruation with your partner.',
      author: 'Relationship Counselor James Wilson',
      date: 'September 12, 2023',
      category: 'Relationships',
      image: coupleImg
    },
    {
      id: 6,
      title: 'Natural Remedies for Menstrual Cramps',
      excerpt: 'Explore effective, drug-free approaches to managing period pain and discomfort.',
      author: 'Holistic Health Practitioner Aisha Brown',
      date: 'September 5, 2023',
      category: 'Wellness',
      image: phytoImg
    }
  ];

  // Categories for filtering
  const categories = ['All', 'Education', 'Nutrition', 'Fitness', 'Health', 'Relationships', 'Wellness'];

  return (
    <div className="blogs-page">
      <Navbar />
      <div className="blogs-content">
        <div className="blogs-header">
          <h1>Menstrual Health Blog</h1>
          <p>Expert insights, tips, and information about menstrual health and wellness</p>
        </div>
        
        <div className="blog-categories">
          {categories.map(category => (
            <button key={category} className={`category-btn ${category === 'All' ? 'active' : ''}`}>
              {category}
            </button>
          ))}
        </div>
        
        <div className="blog-search">
          <input type="text" placeholder="Search blog posts..." />
          <button className="search-btn">Search</button>
        </div>
        
        <div className="blog-grid">
          {blogPosts.map(post => (
            <div key={post.id} className="blog-card">
              <div className="blog-image">
                <img src={post.image} alt={post.title} />
                <span className="blog-category">{post.category}</span>
              </div>
              <div className="blog-content">
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-excerpt">{post.excerpt}</p>
                <div className="blog-meta">
                  <span className="blog-author">{post.author}</span>
                  <span className="blog-date">{post.date}</span>
                </div>
                <button className="read-more-btn">Read More</button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="blog-pagination">
          <button className="pagination-btn active">1</button>
          <button className="pagination-btn">2</button>
          <button className="pagination-btn">3</button>
          <button className="pagination-btn next">Next &raquo;</button>
        </div>
        
        <div className="newsletter-signup">
          <h3>Get the latest articles in your inbox</h3>
          <p>Stay updated with our newest publications, tips, and resources</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Your email address" />
            <button className="subscribe-btn">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs; 