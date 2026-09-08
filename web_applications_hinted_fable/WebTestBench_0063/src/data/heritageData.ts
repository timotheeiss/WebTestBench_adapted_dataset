export interface HeritageItem {
  id: string;
  title: string;
  titleEn: string;
  category: 'craft' | 'performance' | 'folk' | 'art';
  region: string;
  province: string;
  description: string;
  fullDescription: string;
  images: string[];
  hotspotPosition: {
    yaw: number;
    pitch: number;
  };
  year?: number;
}

export const categories = {
  craft: { name: '传统工艺', nameEn: 'Traditional Crafts', color: 'vermillion' },
  performance: { name: '传统表演', nameEn: 'Performing Arts', color: 'gold' },
  folk: { name: '民俗活动', nameEn: 'Folk Activities', color: 'jade' },
  art: { name: '传统美术', nameEn: 'Traditional Art', color: 'primary' },
};

export const provinces = [
  '北京', '江苏', '浙江', '四川', '广东', '福建', '安徽', '山东', '陕西', '云南'
];

export const heritageItems: HeritageItem[] = [
  {
    id: 'suzhou-embroidery',
    title: '苏绣',
    titleEn: 'Suzhou Embroidery',
    category: 'craft',
    region: '江南水乡',
    province: '江苏',
    description: '苏绣是中国四大名绣之一，以精细雅洁著称，图案秀丽、针法活泼、色彩清雅。',
    fullDescription: '苏绣是中国四大名绣之一，起源于江苏苏州地区，有着两千多年的历史。苏绣以精细雅洁著称，构图简练，主题突出，技巧精湛。其中双面绣更是苏绣的精华所在，在同一块底料上，绣出正反两面图像，轮廓完全一样，图案同样精美，针脚同样整齐，没有一点绣迹可寻。苏绣题材广泛，有花卉、动物、人物、风景、静物等，作品或富丽堂皇，或清新淡雅，艺术效果突出。2006年，苏绣被列入第一批国家级非物质文化遗产名录。',
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
      'https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=800',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    ],
    hotspotPosition: { yaw: -30, pitch: 5 },
    year: 2006,
  },
  {
    id: 'peking-opera',
    title: '京剧',
    titleEn: 'Peking Opera',
    category: 'performance',
    region: '京城古韵',
    province: '北京',
    description: '京剧是中国影响最大的戏曲剧种，被誉为"国粹"，以唱念做打的表演方式闻名于世。',
    fullDescription: '京剧，又称平剧、京戏，是中国影响最大的戏曲剧种，被誉为"国粹"。京剧形成于北京，融合了多种地方戏曲的精华，在二百多年的发展历程中，形成了独特的艺术风格。京剧表演讲究唱念做打，程式化动作优美规范。脸谱艺术是京剧的重要特色，通过颜色和图案表现人物性格和命运。京剧剧目丰富，传统剧目有一千三百多个，常演的约三四百个。2010年，京剧被联合国教科文组织列入"人类非物质文化遗产代表作名录"。',
    images: [
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    ],
    hotspotPosition: { yaw: 45, pitch: -10 },
    year: 2010,
  },
  {
    id: 'dragon-boat',
    title: '端午龙舟',
    titleEn: 'Dragon Boat Racing',
    category: 'folk',
    region: '楚地遗风',
    province: '广东',
    description: '龙舟竞渡是端午节最具代表性的民俗活动，承载着对屈原的纪念和对美好生活的祈愿。',
    fullDescription: '龙舟竞渡是中国端午节最具代表性的传统民俗活动之一，有着两千多年的历史。相传起源于古代楚国人因舍不得贤臣屈原投江死去，争先恐后划船追赶拯救，此后逐渐发展成为一种民间体育竞技活动。龙舟竞渡不仅是速度与力量的比拼，更承载着丰富的文化内涵。比赛用的龙舟造型精美，龙头昂扬，栩栩如生。每逢端午，江河湖海上锣鼓喧天，健儿们奋力划桨，场面壮观。2009年，端午节被联合国教科文组织列入"人类非物质文化遗产代表作名录"。',
    images: [
      'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800',
      'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800',
      'https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?w=800',
    ],
    hotspotPosition: { yaw: 120, pitch: 0 },
    year: 2009,
  },
  {
    id: 'paper-cutting',
    title: '剪纸',
    titleEn: 'Paper Cutting',
    category: 'art',
    region: '黄土高原',
    province: '陕西',
    description: '剪纸是中国最古老的民间艺术之一，用剪刀或刻刀在纸上剪刻花纹，寓意吉祥美好。',
    fullDescription: '剪纸是中国最古老的民间艺术之一，至今已有一千五百多年的历史。剪纸以纸为材料，以剪刀或刻刀为工具，通过剪刻镂空的方式表现各种形象。中国剪纸分布广泛，风格各异：北方剪纸粗犷豪放，南方剪纸玲珑剔透。剪纸题材丰富，包括花鸟虫鱼、神话传说、戏曲人物等，寓意吉祥美好。每逢春节、婚庆等喜庆场合，剪纸作品被张贴于门窗、墙壁，增添喜庆气氛。2009年，中国剪纸被联合国教科文组织列入"人类非物质文化遗产代表作名录"。',
    images: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
      'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    ],
    hotspotPosition: { yaw: -120, pitch: 10 },
    year: 2009,
  },
  {
    id: 'yixing-teapot',
    title: '宜兴紫砂',
    titleEn: 'Yixing Purple Clay',
    category: 'craft',
    region: '太湖之滨',
    province: '江苏',
    description: '宜兴紫砂壶以独特的紫砂泥料制成，造型古朴典雅，是中国传统茶文化的重要载体。',
    fullDescription: '宜兴紫砂壶是中国特有的手工制造陶土工艺品，起源于宋代，盛于明清。宜兴紫砂壶以江苏宜兴出产的紫砂泥为原料，经过选泥、打泥片、围身筒、装饰等数十道工序精心制作而成。紫砂壶造型丰富，有光货、花货、筋瓤货等类型，每一件都是独一无二的艺术品。紫砂壶具有透气不透水的特性，用来泡茶，色香味俱佳。历代文人雅士对紫砂壶情有独钟，使之成为中国传统茶文化的重要载体。2006年，宜兴紫砂陶制作技艺被列入第一批国家级非物质文化遗产名录。',
    images: [
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800',
      'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800',
      'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=800',
    ],
    hotspotPosition: { yaw: 80, pitch: 15 },
    year: 2006,
  },
  {
    id: 'kunqu-opera',
    title: '昆曲',
    titleEn: 'Kunqu Opera',
    category: 'performance',
    region: '姑苏雅韵',
    province: '江苏',
    description: '昆曲是中国最古老的戏曲剧种之一，被誉为"百戏之祖"，以典雅细腻的表演著称。',
    fullDescription: '昆曲是中国最古老的戏曲剧种之一，起源于元末明初的昆山腔，距今已有六百多年历史。昆曲被誉为"百戏之祖"，对中国其他戏曲剧种产生了深远影响。昆曲音乐优美婉转，表演细腻典雅，文辞讲究，具有很高的文学价值。《牡丹亭》《长生殿》《桃花扇》等经典剧目流传至今，仍然打动着观众。2001年，昆曲被联合国教科文组织列入首批"人类口头和非物质遗产代表作"，成为中国第一个入选的项目。',
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800',
    ],
    hotspotPosition: { yaw: -80, pitch: -5 },
    year: 2001,
  },
  {
    id: 'spring-festival',
    title: '春节',
    titleEn: 'Spring Festival',
    category: 'folk',
    region: '华夏大地',
    province: '北京',
    description: '春节是中国最重要的传统节日，承载着团圆、祈福、辞旧迎新等丰富的文化内涵。',
    fullDescription: '春节是中国最重要的传统节日，有着四千多年的历史。春节标志着农历新年的开始，人们在这一天辞旧迎新，祈求来年平安吉祥。春节期间的习俗丰富多彩：贴春联、挂灯笼、放鞭炮、吃年夜饭、守岁、拜年、发红包等。除夕之夜，全家人团聚一堂，共享丰盛的年夜饭，这是中国人最重视的家庭聚会。春节期间还有舞龙舞狮、庙会等传统活动，热闹非凡。春节不仅是中国人的节日，也是中华文化向世界展示的重要窗口。',
    images: [
      'https://images.unsplash.com/photo-1548016655-f65f6a3d6e8c?w=800',
      'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800',
      'https://images.unsplash.com/photo-1485686531765-ba63b07845a7?w=800',
    ],
    hotspotPosition: { yaw: 160, pitch: 5 },
    year: 2006,
  },
  {
    id: 'chinese-calligraphy',
    title: '书法',
    titleEn: 'Chinese Calligraphy',
    category: 'art',
    region: '神州墨韵',
    province: '安徽',
    description: '书法是中国特有的艺术形式，以毛笔书写汉字，融合了文字、绘画与哲学的精髓。',
    fullDescription: '书法是中国特有的艺术形式，有着三千多年的历史。书法以毛笔为工具，以汉字为载体，通过笔墨的浓淡、线条的粗细、结构的疏密来表达书写者的情感和意境。中国书法有篆、隶、楷、行、草五种主要书体，各有特色。书法不仅是一门艺术，更是修身养性的方式，古人云"字如其人"，书法作品能够反映书写者的性格和修养。历代书法大家如王羲之、颜真卿、苏轼等，其作品被后人视为珍宝。2009年，中国书法被联合国教科文组织列入"人类非物质文化遗产代表作名录"。',
    images: [
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800',
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800',
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800',
    ],
    hotspotPosition: { yaw: -160, pitch: -10 },
    year: 2009,
  },
];

export const getHeritageById = (id: string): HeritageItem | undefined => {
  return heritageItems.find(item => item.id === id);
};

export const getHeritageByCategory = (category: string): HeritageItem[] => {
  return heritageItems.filter(item => item.category === category);
};

export const getHeritageByProvince = (province: string): HeritageItem[] => {
  return heritageItems.filter(item => item.province === province);
};
