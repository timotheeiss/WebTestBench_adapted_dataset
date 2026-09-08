import { useMemo } from 'react';
import { motion } from 'framer-motion';
import HeritageCard from './HeritageCard';
import { heritageItems, categories, provinces } from '@/data/heritageData';
import { useFilterStore } from '@/store/filterStore';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const HeritageListing = () => {
  const {
    selectedCategory,
    selectedProvince,
    searchQuery,
    sortBy,
    sortOrder,
    setCategory,
    setProvince,
    setSearchQuery,
    setSortBy,
    resetFilters,
  } = useFilterStore();

  const filteredAndSortedItems = useMemo(() => {
    let items = [...heritageItems];
    
    // Filter by category
    if (selectedCategory) {
      items = items.filter(item => item.category === selectedCategory);
    }
    
    // Filter by province
    if (selectedProvince) {
      items = items.filter(item => item.province === selectedProvince);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.titleEn.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.region.toLowerCase().includes(query)
      );
    }
    
    // Sort
    items.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.title.localeCompare(b.title, 'zh-CN');
          break;
        case 'year':
          comparison = (a.year || 0) - (b.year || 0);
          break;
        case 'region':
          comparison = a.province.localeCompare(b.province, 'zh-CN');
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    
    return items;
  }, [selectedCategory, selectedProvince, searchQuery, sortBy, sortOrder]);

  const hasActiveFilters = selectedCategory || selectedProvince || searchQuery;

  return (
    <section id="categories" className="py-16 bg-paper">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            非遗项目
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            探索中国丰富多彩的非物质文化遗产，感受千年传承的文化魅力
          </p>
        </motion.div>
        
        {/* Filters */}
        <div
          className="flex flex-wrap gap-4 mb-8 p-4 bg-card rounded-lg shadow-sm"
          data-semtag-id="listing.filters"
          data-semtag-role="region"
        >
          <div className="flex-1 min-w-[200px]">
            <Input
              placeholder="搜索非遗项目..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
              data-semtag-id="listing.search"
              data-semtag-role="input"
              data-semtag-state="filters.query"
              data-semtag-controls="listing.grid"
            />
          </div>

          <Select value={selectedCategory || "all"} onValueChange={(v) => setCategory(v === "all" ? null : v)}>
            <SelectTrigger
              className="w-[150px]"
              data-semtag-id="listing.filter.category"
              data-semtag-role="select"
              data-semtag-state="filters.category"
              data-semtag-controls="listing.grid"
              data-semtag-options={`all|全部类别;${Object.entries(categories).map(([key, value]) => `${key}|${value.name}`).join(";")}`}
            >
              <SelectValue placeholder="全部类别" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                value="all"
                data-semtag-id="listing.filter.category.option.all"
                data-semtag-role="option"
              >全部类别</SelectItem>
              {Object.entries(categories).map(([key, value]) => (
                <SelectItem
                  key={key}
                  value={key}
                  data-semtag-id={`listing.filter.category.option.${key}`}
                  data-semtag-role="option"
                >{value.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedProvince || "all"} onValueChange={(v) => setProvince(v === "all" ? null : v)}>
            <SelectTrigger
              className="w-[150px]"
              data-semtag-id="listing.filter.province"
              data-semtag-role="select"
              data-semtag-state="filters.province"
              data-semtag-controls="listing.grid"
              data-semtag-options={`all|全部地区;${provinces.join(";")}`}
            >
              <SelectValue placeholder="全部地区" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                value="all"
                data-semtag-id="listing.filter.province.option.all"
                data-semtag-role="option"
              >全部地区</SelectItem>
              {provinces.map((province) => (
                <SelectItem
                  key={province}
                  value={province}
                  data-semtag-id={`listing.filter.province.option.${province}`}
                  data-semtag-role="option"
                >{province}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={(v) => setSortBy(v as any)}>
            <SelectTrigger
              className="w-[150px]"
              data-semtag-id="listing.sort"
              data-semtag-role="select"
              data-semtag-state="filters.sort"
              data-semtag-controls="listing.grid"
              data-semtag-options="name|按名称;year|按年份;region|按地区"
            >
              <SelectValue placeholder="排序方式" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                value="name"
                data-semtag-id="listing.sort.option.name"
                data-semtag-role="option"
              >按名称</SelectItem>
              <SelectItem
                value="year"
                data-semtag-id="listing.sort.option.year"
                data-semtag-role="option"
              >按年份</SelectItem>
              <SelectItem
                value="region"
                data-semtag-id="listing.sort.option.region"
                data-semtag-role="option"
              >按地区</SelectItem>
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              data-semtag-id="listing.filters.clear"
              data-semtag-role="action"
              data-semtag-action="clear-filters"
              data-semtag-controls="listing.grid"
            >
              清除筛选
            </button>
          )}
        </div>

        {/* Results count */}
        <p
          className="text-sm text-muted-foreground mb-6"
          data-semtag-id="listing.results"
          data-semtag-role="observable"
          data-semtag-state="listing.count"
        >
          共 {filteredAndSortedItems.length} 个非遗项目
        </p>

        {/* Grid */}
        {filteredAndSortedItems.length > 0 ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            data-semtag-id="listing.grid"
            data-semtag-role="collection"
          >
            {filteredAndSortedItems.map((item, index) => (
              <HeritageCard key={item.id} item={item} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p
              className="text-muted-foreground"
              data-semtag-id="listing.empty"
              data-semtag-role="observable"
            >没有找到匹配的非遗项目</p>
            <button
              onClick={resetFilters}
              className="mt-4 text-primary hover:text-primary/80 transition-colors"
              data-semtag-id="listing.empty.clear"
              data-semtag-role="action"
              data-semtag-action="clear-filters"
              data-semtag-controls="listing.grid"
            >
              清除筛选条件
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeritageListing;
