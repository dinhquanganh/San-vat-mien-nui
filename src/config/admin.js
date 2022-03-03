const sidebar = [
  {
    url: '/admin',
    name: 'Tổng quan',
    multiple: {
      type: false
    }
  },
  {
    url: '#navbar-products',
    name: 'Sản phẩm',
    multiple: {
      type: true,
      data: [
        {
          url: '/admin/product/create',
          name: 'Tạo mới'
        },
        {
          url: '/admin/product',
          name: 'Tổng quan'
        },
        {
          url: '/admin/product?category=tea',
          name: 'Trà'
        },
        {
          url: '/admin/product?category=food-spice',
          name: 'Đồ ăn / Gia vị'
        },
        {
          url: '/admin/product?category=seed-and-fruit',
          name: 'Hạt / Hoa quả sấy'
        },
        {
          url: '/admin/product?category=honey-medicine',
          name: 'Mật ong / Dược liệu'
        }
      ]
    }
  },
  {
    url: '#navbar-orders',
    name: 'Sản phẩm',
    multiple: {
      type: true,
      data: [
        {
          url: '/admin/order/create',
          name: 'Tạo mới'
        },
        {
          url: '/admin/order',
          name: 'Tổng quan'
        }
      ]
    }
  }
];
module.exports = {
  sidebar
};
