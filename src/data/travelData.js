const travelData = [
  {
    id: "1",
    title: "Cần Thơ",
    description: "Bến Ninh Kiều, chợ nổi Cái Răng và ẩm thực phong phú.",
    details:
      "Cần Thơ là thành phố lớn nhất vùng Đồng bằng sông Cửu Long. Nơi đây nổi tiếng với các chợ nổi, những khu vườn trái cây tươi ngon, và vẻ đẹp thanh bình của sông nước.",
    image: "https://phunuvietnam.mediacdn.vn/thumb_w/700/179072216278405120/2023/7/7/sb2969-14-1688744822052601464037-16-0-311-472-crop-16887448286531165227658.jpg",
    rating: 4.5,
    phone: "123-456-789",
    facebook: "https://facebook.com/cantho",
    instagram: "https://instagram.com/cantho",
    comments: [
      {
        user: "Nguyen An",
        rating: 5,
        text: "Cần Thơ thật tuyệt vời! Những chuyến đi trên sông và các món ăn đặc trưng là một trải nghiệm không thể quên."
      },
      {
        user: "Mai Lan",
        rating: 4,
        text: "Chợ nổi Cái Răng rất thú vị, nhưng có thể hơi ồn ào một chút. Mọi thứ rất tuyệt."
      },
      {
        user: "Thuy Linh",
        rating: 5,
        text: "Một thành phố thanh bình với những con người thân thiện. Mình đã có một chuyến đi tuyệt vời!"
      }
    ]
  },
  {
    id: "2",
    title: "Châu Đốc",
    description: "Núi Sam, Miếu Bà Chúa Xứ và làng nổi Châu Đốc.",
    details:
      "Châu Đốc là điểm đến linh thiêng với các di tích như Miếu Bà Chúa Xứ và cảnh đẹp sông nước yên bình. Đây cũng là nơi giao thoa văn hóa Việt - Khmer.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgwwaG9kHlXcU8wL0sGTKDBzFNVdLy3c8Rgw&s",
    rating: 4.0,
    phone: "987-654-321",
    facebook: "https://facebook.com/chaudoc",
    instagram: "https://instagram.com/chaudoc",
    comments: [
      {
        user: "Lan Anh",
        rating: 4,
        text: "Cảnh đẹp, không khí trong lành, tuy nhiên chưa có nhiều hoạt động du lịch hiện đại."
      },
      {
        user: "Trung Quân",
        rating: 4.5,
        text: "Miếu Bà Chúa Xứ thật linh thiêng, và không khí ở đây rất yên bình. Tuy nhiên đường đi hơi khó khăn."
      },
      {
        user: "Thao Mai",
        rating: 3.5,
        text: "Châu Đốc rất đẹp, nhưng tôi nghĩ có thể phát triển thêm nhiều dịch vụ du lịch để thu hút khách hơn."
      }
    ]
  },
  {
    id: "3",
    title: "Bạc Liêu",
    description: "Cánh đồng quạt gió và nhà công tử Bạc Liêu.",
    details:
      "Bạc Liêu nổi bật với cánh đồng quạt gió khổng lồ, tượng trưng cho sự phát triển của năng lượng xanh. Nơi đây còn có Nhà Công Tử Bạc Liêu nổi tiếng với nhiều câu chuyện lịch sử thú vị.",
    image: "https://xaydung.gov.vn/Images/editor/images/MOC/2023/Thang%208/08301a2.jpg",
    rating: 3.0,
    phone: "456-789-012",
    facebook: "https://facebook.com/baclieu",
    instagram: "https://instagram.com/baclieu",
    comments: [
      {
        user: "Minh Tu",
        rating: 3,
        text: "Bạc Liêu có một số điểm tham quan thú vị, nhưng cơ sở hạ tầng và dịch vụ du lịch cần cải thiện."
      },
      {
        user: "Hoa Lan",
        rating: 3.5,
        text: "Cánh đồng quạt gió rất ấn tượng, nhưng tôi nghĩ có thể phát triển thêm các hoạt động du lịch tại đây."
      },
      {
        user: "Thanh Son",
        rating: 4,
        text: "Bạc Liêu rất yên bình, và Nhà Công Tử Bạc Liêu là một điểm tham quan rất thú vị với lịch sử đặc biệt."
      }
    ]
  },
  {
    id: "4",
    title: "Hồ Chí Minh",
    description: "Bến Bạch Đằng, chợ Bến Thành và các công trình lịch sử.",
    details:
      "Hồ Chí Minh là thành phố lớn nhất Việt Nam, nổi bật với sự pha trộn giữa văn hóa hiện đại và di tích lịch sử, từ các công trình Pháp đến những khu phố hiện đại.",
    image: "https://www.thiennhien.net/wp-content/uploads/2014/03/210314_dongbangSCL.jpg",
    rating: 5.0,
    phone: "789-012-345",
    facebook: "https://facebook.com/hochiminh",
    instagram: "https://instagram.com/hochiminh",
    comments: [
      {
        user: "Hoang Anh",
        rating: 5,
        text: "Hồ Chí Minh luôn sôi động và đầy năng lượng. Một thành phố tuyệt vời để du lịch và làm việc."
      },
      {
        user: "Quang Minh",
        rating: 4.5,
        text: "Một thành phố tuyệt vời với rất nhiều điều để khám phá. Chợ Bến Thành là một địa điểm rất thú vị."
      },
      {
        user: "Thao Bao",
        rating: 5,
        text: "Hồ Chí Minh là trung tâm của cả nước với các công trình lịch sử độc đáo và các khu phố mua sắm hiện đại."
      }
    ]
  },
  {
    id: "5",
    title: "Đà Nẵng",
    description: "Bà Nà Hills, cầu Rồng và bãi biển Mỹ Khê.",
    details:
      "Đà Nẵng nổi bật với bãi biển dài cát trắng, cầu Rồng, và khu du lịch Bà Nà Hills với các công trình kiến trúc độc đáo và khí hậu dễ chịu.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXgZNbZl_rHQthn4ADkWBri-TKK_MVeZiPTA&s",
    rating: 4.8,
    phone: "321-654-987",
    facebook: "https://facebook.com/danang",
    instagram: "https://instagram.com/danang",
    comments: [
      {
        user: "Quang Duy",
        rating: 5,
        text: "Đà Nẵng có bãi biển tuyệt đẹp và nhiều hoạt động thú vị, đặc biệt là Bà Nà Hills. Không thể bỏ qua!"
      },
      {
        user: "Nguyen Linh",
        rating: 4.5,
        text: "Cầu Rồng rất đẹp, và Bà Nà Hills có rất nhiều hoạt động vui chơi. Tuy nhiên, vào mùa du lịch, rất đông khách."
      },
      {
        user: "Thanh Mai",
        rating: 4,
        text: "Đà Nẵng là một thành phố du lịch tuyệt vời. Thời tiết dễ chịu và có rất nhiều địa điểm đẹp để tham quan."
      }
    ]
  },
];

export default travelData;
