import {
  HomeOutlined,
  AppstoreOutlined,
  BarsOutlined,
  ToolOutlined,
  UserOutlined,
  SafetyOutlined,
  AreaChartOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
  WindowsOutlined
} from '@ant-design/icons';

const menuList = [
    {
      title: '首页', // 菜单标题名称
      key: '/home', // 对应的path
      icon: 'HomeOutlined', // 图标名称
      icon1: HomeOutlined, // 图标对象
      isPublic: true, // 公开的
    },
    {
      title: '商品',
      key: '/products',
      icon: 'AppstoreOutlined',
      icon1: AppstoreOutlined,
      children: [ // 子菜单列表
        {
          title: '品类管理',
          key: '/category',
          icon: 'BarsOutlined',
          icon1: BarsOutlined
        },
        {
          title: '商品管理',
          key: '/product',
          icon: 'ToolOutlined',
          icon1: ToolOutlined
        },
      ]
    },
  
    {
      title: '用户管理',
      key: '/user',
      icon: 'UserOutlined',
      icon1: UserOutlined
    },
    {
      title: '角色管理',
      key: '/role',
      icon: 'SafetyOutlined',
      icon1: SafetyOutlined
    },
  
    {
      title: '图形图表',
      key: '/charts',
      icon: 'AreaChartOutlined',
      icon1: AreaChartOutlined,
      children: [
        {
          title: '柱形图',
          key: '/charts/bar',
          icon: 'BarChartOutlined',
          icon1: BarChartOutlined
        },
        {
          title: '折线图',
          key: '/charts/line',
          icon: 'LineChartOutlined',
          icon1: LineChartOutlined
        },
        {
          title: '饼图',
          key: '/charts/pie',
          icon: 'PieChartOutlined',
          icon1: PieChartOutlined
        },
      ]
    },
  
    {
      title: '订单管理',
      key: '/order',
      icon: 'WindowsOutlined',
      icon1: WindowsOutlined
    },
  ]
  
  export default menuList