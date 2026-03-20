'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Download, Film, Loader2 } from 'lucide-react';
import * as htmlToImage from 'html-to-image';

interface Movie {
  id: number;
  title: string;
  original_title?: string;
  poster_path: string;
  release_date: string;
  posters?: string[];
}

interface MovieTicketProps {
  movie: Movie | null;
  posterList: string[];
  frontPosterIndex: number;
  backPosterIndex: number;
  cinema: string;
  hall: string;
  seat: string;
  time: string;
  backgroundColor: string;
  textColor: string;
  isFront: boolean;
  isRounded: boolean;
}

const MovieTicket: React.FC<MovieTicketProps> = ({
  movie,
  posterList,
  frontPosterIndex,
  backPosterIndex,
  cinema,
  hall,
  seat,
  time,
  backgroundColor,
  textColor,
  isFront,
  isRounded,
}) => {
  // 生成齿轮孔
  const renderPerforations = () => {
    const perforations = [];
    const count = 12;
    for (let i = 0; i < count; i++) {
      perforations.push(
        <div
          key={i}
          className="w-4 h-4 rounded-full bg-white"
          style={{
            marginLeft: `${(i / (count - 1)) * 100}%`,
          }}
        />
      );
    }
    return perforations;
  };
  
  // 正面票根
  if (isFront) {
    return (
      <div className={`relative w-[400px] h-[750px] ${isRounded ? 'rounded-2xl' : 'rounded-none'} shadow-[0_20px_50px_rgba(0,0,0,0.1)] transform transition-all duration-300 hover:shadow-[0_25px_60px_rgba(0,0,0,0.15)] overflow-hidden`} style={{ backgroundColor: '#ffffff' }}>
        {/* 顶部齿轮孔 */}
        <div className="absolute top-0 left-0 right-0 h-4 flex items-center justify-between px-4" style={{ backgroundColor }}>
          {renderPerforations()}
        </div>
        
        {/* 票根主体 - 背景层 */}
        <div
          className={`relative w-full h-full p-4 flex flex-col transition-all duration-500 overflow-hidden ${isRounded ? 'rounded-2xl' : 'rounded-none'}`}
          style={{
            backgroundColor: backgroundColor,
            color: textColor,
            boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.1)',
            backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Cg fill-rule="evenodd"%3E%3Cg fill="%23000000" fill-opacity="0.1"%3E%3Cpath opacity=".5" d="M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z"/%3E%3Cpath d="M6 5V0H5v5H0v1h5v94h1V6h94V5H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        >
          {/* 电影海报 */}
          {movie && posterList.length > 0 && (
            <div className="w-full h-[66.67%]">
              <div className={`w-full h-full ${isRounded ? 'rounded-2xl' : 'rounded-none'} shadow-lg transform transition-all duration-300 hover:scale-[1.02] relative overflow-hidden`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${posterList[frontPosterIndex]}`}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
              </div>
            </div>
          )}
          
          {/* 空白区域 - 用于将虚线和文字模块向下移动 */}
          <div className="w-full h-8"></div>
          
          {/* 虚线分隔线 */}
          <div className="w-full h-0.5 border-t" style={{ borderColor: textColor, borderStyle: 'dashed' }}></div>
          
          {/* 票务信息 */}
          <div className="w-full h-[28%] pt-4 pb-8 overflow-visible">
            <h2 className="text-xl font-bold mb-1" style={{ color: textColor, fontFamily: 'AlimamaFangYuanTiVF-Thin-2, sans-serif', textShadow: '2px 2px 0 rgba(0,0,0,0.1)' }}>{movie?.title || '选择电影'}</h2>
            {movie?.original_title && movie.original_title !== movie.title && <p className="text-xs font-semibold uppercase tracking-widest mt-2 opacity-80 mb-4" style={{ color: textColor, fontFamily: 'AlimamaFangYuanTiVF-Thin-2, sans-serif' }}>{movie.original_title}</p>}
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: textColor, opacity: 0.8, fontFamily: 'AlimamaFangYuanTiVF-Thin-2, sans-serif' }}>影院</span>
                <span className="text-base font-bold tracking-tight max-w-[180px] text-right" style={{ color: textColor, fontFamily: 'AlimamaFangYuanTiVF-Thin-2, sans-serif' }}>{cinema || '输入影院名称'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: textColor, opacity: 0.8, fontFamily: 'AlimamaFangYuanTiVF-Thin-2, sans-serif' }}>放映厅</span>
                <span className="text-base font-bold tracking-tight max-w-[180px] text-right" style={{ color: textColor, fontFamily: 'AlimamaFangYuanTiVF-Thin-2, sans-serif' }}>{hall || '输入放映厅'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: textColor, opacity: 0.8, fontFamily: 'AlimamaFangYuanTiVF-Thin-2, sans-serif' }}>座位</span>
                <span className="text-base font-bold tracking-tight max-w-[180px] text-right" style={{ color: textColor, fontFamily: 'AlimamaFangYuanTiVF-Thin-2, sans-serif' }}>{seat || '输入座位号'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: textColor, opacity: 0.8, fontFamily: 'AlimamaFangYuanTiVF-Thin-2, sans-serif' }}>时间</span>
                <span className="text-base font-bold tracking-tight max-w-[180px] text-right" style={{ color: textColor, fontFamily: 'AlimamaFangYuanTiVF-Thin-2, sans-serif' }}>{time || '输入放映时间'}</span>
              </div>
            </div>
          </div>
          

        </div>
        
        {/* 底部齿轮孔 */}
        <div className="absolute bottom-0 left-0 right-0 h-4 flex items-center justify-between px-4" style={{ backgroundColor }}>
          {renderPerforations()}
        </div>
      </div>
    );
  }
  
  // 反面票根
  return (
    <div className={`relative w-[400px] h-[750px] ${isRounded ? 'rounded-2xl' : 'rounded-none'} shadow-[0_20px_50px_rgba(0,0,0,0.1)] transform transition-all duration-300 hover:shadow-[0_25px_60px_rgba(0,0,0,0.15)] overflow-hidden`} style={{ backgroundColor: '#ffffff', filter: 'saturate(1.2) sepia(0.15)' }}>
      {/* 顶部齿轮孔 */}
      <div className="absolute top-0 left-0 right-0 h-4 flex items-center justify-between px-4" style={{ backgroundColor }}>
        {renderPerforations()}
      </div>
      
      {/* 票根主体 */}
      <div
        className={`relative w-full h-full p-3 transition-colors duration-500 overflow-hidden ${isRounded ? 'rounded-2xl' : 'rounded-none'}`}
        style={{
          backgroundColor,
          boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* 两张海报 */}
        {movie && posterList.length > 0 && (
          <div className="w-full h-full flex flex-col gap-1">
            {/* 上半部分海报 */}
            <div className={`flex-1 relative overflow-hidden ${isRounded ? 'rounded-lg' : 'rounded-none'}`} style={{ maskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)' }}>
              <img
                src={`https://image.tmdb.org/t/p/w1280${posterList[backPosterIndex]}`}
                alt={movie.title}
                className={`w-full h-full object-cover ${isRounded ? 'rounded-lg' : 'rounded-none'}`}
                crossOrigin="anonymous"
                style={{ objectPosition: 'center 30%' }}
              />
            </div>
            
            {/* 下半部分海报 */}
            <div className={`flex-1 relative overflow-hidden ${isRounded ? 'rounded-lg' : 'rounded-none'}`} style={{ maskImage: 'linear-gradient(to top, black 90%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, black 90%, transparent 100%)' }}>
              <img
                src={`https://image.tmdb.org/t/p/w1280${posterList[(backPosterIndex + 1) % posterList.length]}`}
                alt={movie.title}
                className={`w-full h-full object-cover ${isRounded ? 'rounded-lg' : 'rounded-none'}`}
                crossOrigin="anonymous"
                style={{ objectPosition: 'center 30%' }}
              />
            </div>
          </div>
        )}
      </div>
      
      {/* 底部齿轮孔 */}
      <div className="absolute bottom-0 left-0 right-0 h-4 flex items-center justify-between px-4" style={{ backgroundColor }}>
        {renderPerforations()}
      </div>
    </div>
  );
};

export default function Home() {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [posterList, setPosterList] = useState<string[]>([]);
  const [frontPosterIndex, setFrontPosterIndex] = useState(0);
  const [backPosterIndex, setBackPosterIndex] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showNoMovieMessage, setShowNoMovieMessage] = useState(false);
  const [isSelectingMovie, setIsSelectingMovie] = useState(false);
  const [cinema, setCinema] = useState('');
  const [hall, setHall] = useState('');
  const [seat, setSeat] = useState('');
  const [time, setTime] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#1e293b');

  const [isFront, setIsFront] = useState(true);
  const [isRounded, setIsRounded] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const frontTicketRef = useRef<HTMLDivElement>(null);
  const backTicketRef = useRef<HTMLDivElement>(null);

  // 搜索电影
  useEffect(() => {
    if (isSelectingMovie) {
      return;
    }
    
    // 如果已经选择了电影且搜索查询与电影标题相同，则不执行搜索
    if (movie && searchQuery === movie.title) {
      setSearchResults([]);
      setError(null);
      setShowNoMovieMessage(false);
      return;
    }
    
    if (searchQuery.length < 2) {
      setSearchResults([]);
      setError(null);
      setShowNoMovieMessage(false);
      return;
    }
    
    const searchMovies = async () => {
      setIsSearching(true);
      setError(null);
      setShowNoMovieMessage(false);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${encodeURIComponent(searchQuery)}&language=zh-CN`
        );
        
        if (!response.ok) {
          throw new Error(`API请求失败: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        setSearchResults(data.results || []);
        
        // 如果没有搜索结果，延迟3秒显示"抱歉，该电影暂未收录"的消息
        if ((data.results && data.results.length === 0) && !movie) {
          const timeoutId = setTimeout(() => {
            setShowNoMovieMessage(true);
          }, 3000);
          return () => clearTimeout(timeoutId);
        }
      } catch (error) {
        console.error('搜索电影失败:', error);
        setError(error instanceof Error ? error.message : '搜索失败，请稍后重试');
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };
    
    const timeoutId = setTimeout(searchMovies, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, movie, isSelectingMovie]);

  // 监听海报索引变化，更新票面颜色
  useEffect(() => {
    if (posterList.length > 0) {
      // 提取当前显示海报的主色调
      const currentPosterIndex = isFront ? frontPosterIndex : backPosterIndex;
      const currentPoster = posterList[currentPosterIndex];
      
      if (currentPoster) {
        const posterUrl = `https://image.tmdb.org/t/p/w500${currentPoster}`;
        extractDominantColor(posterUrl).then(dominantColor => {
          setBackgroundColor(dominantColor);
          const contrastTextColor = getContrastTextColor(dominantColor);
          setTextColor(contrastTextColor);
        });
      }
    }
  }, [frontPosterIndex, backPosterIndex, isFront, posterList]);

  // 计算颜色的相对亮度（用于判断明暗）
  const getRelativeLuminance = (color: string) => {
    // 移除 # 号
    const hex = color.replace('#', '');
    // 解析 RGB 值
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    
    // 计算相对亮度
    const getLinearRGB = (value: number) => {
      return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
    };
    
    const R = getLinearRGB(r);
    const G = getLinearRGB(g);
    const B = getLinearRGB(b);
    
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  };

  // 根据背景色自动计算合适的文字颜色
  const getContrastTextColor = (backgroundColor: string) => {
    const luminance = getRelativeLuminance(backgroundColor);
    // 如果背景较暗，返回白色；如果背景较亮，返回深色
    return luminance <= 0.5 ? '#ffffff' : '#1e293b';
  };

  // 提取图片主色调
  const extractDominantColor = (imageUrl: string) => {
    return new Promise<string>((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve('#ffffff');
          return;
        }
        
        canvas.width = 100;
        canvas.height = 100;
        ctx.drawImage(img, 0, 0, 100, 100);
        
        const imageData = ctx.getImageData(0, 0, 100, 100);
        const data = imageData.data;
        const colorCounts: Record<string, number> = {};
        
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];
          
          if (a > 128) {
            const color = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
            colorCounts[color] = (colorCounts[color] || 0) + 1;
          }
        }
        
        let dominantColor = '#ffffff';
        let maxCount = 0;
        
        for (const [color, count] of Object.entries(colorCounts)) {
          if (count > maxCount) {
            maxCount = count;
            dominantColor = color;
          }
        }
        
        resolve(dominantColor);
      };
      img.onerror = () => {
        resolve('#ffffff');
      };
      img.src = imageUrl;
    });
  };



  // 选择电影
  const handleSelectMovie = async (selectedMovie: Movie) => {
    setIsSelectingMovie(true);
    setIsLoading(true);
    setMovie(selectedMovie);
    setSearchResults([]);
    setShowNoMovieMessage(false);
    // 清空海报列表，确保切换电影时能正确重新加载
    setPosterList([]);
    setFrontPosterIndex(0);
    setBackPosterIndex(0);
    if (selectedMovie.release_date) {
      setTime(selectedMovie.release_date);
    }
    
    try {
      // 提取海报主色调
      if (selectedMovie.poster_path) {
        const posterUrl = `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`;
        const dominantColor = await extractDominantColor(posterUrl);
        setBackgroundColor(dominantColor);
        // 根据背景色自动计算合适的文字颜色
        const contrastTextColor = getContrastTextColor(dominantColor);
        setTextColor(contrastTextColor);
      }
      
      // 获取电影的更多海报图片
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${selectedMovie.id}/images?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&include_image_language=zh,en`
      );
      const data = await response.json();
      
      let topPosters: string[] = [];
      
      if (data.posters && data.posters.length > 0) {
        // 获取前10张高质量海报
        topPosters = data.posters
          .sort((a: any, b: any) => (b.vote_average || 0) - (a.vote_average || 0))
          .slice(0, 10)
          .map((poster: any) => poster.file_path);
      } else if (selectedMovie.poster_path) {
        // 如果没有更多海报，使用电影的主海报
        topPosters = [selectedMovie.poster_path];
      }
      
      setPosterList(topPosters);
      
      // 重置海报索引
      setFrontPosterIndex(0);
      setBackPosterIndex(topPosters.length > 1 ? 1 : 0);
      
      // 提取第一张海报的主色调
      if (topPosters.length > 0) {
        const posterUrl = `https://image.tmdb.org/t/p/w500${topPosters[0]}`;
        const dominantColor = await extractDominantColor(posterUrl);
        setBackgroundColor(dominantColor);
        const contrastTextColor = getContrastTextColor(dominantColor);
        setTextColor(contrastTextColor);
      }
      
      // 保存海报到电影对象
      setMovie({ ...selectedMovie, posters: topPosters });
    } catch (error) {
      console.error('获取海报失败:', error);
    } finally {
      setIsLoading(false);
      setIsSelectingMovie(false);
      // 在 isSelectingMovie 设为 false 之后再更新 searchQuery，避免触发搜索
      setSearchQuery(selectedMovie.title);
    }
  };

  // 导出票根
  const handleExportTicket = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      // 给浏览器留出渲染Shadow DOM的时间
      await new Promise(r => setTimeout(r, 500));
      
      // 渲染Shadow正面
      const shadowFrontTicket = document.getElementById('shadow-front-ticket');
      if (!shadowFrontTicket) {
        console.error('Shadow正面票根未找到');
        return;
      }
      
      // 使用html-to-image代替html2canvas
      const frontDataUrl = await htmlToImage.toJpeg(shadowFrontTicket, {
        quality: 0.92,
        pixelRatio: 2,
        backgroundColor: null
      });
      
      // 下载正面
      const frontLink = document.createElement('a');
      frontLink.download = `${movie?.title || 'movie'}_正面.jpg`;
      frontLink.href = frontDataUrl;
      frontLink.click();
      
      // 异步等待500ms后渲染Shadow背面
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const shadowBackTicket = document.getElementById('shadow-back-ticket');
      if (!shadowBackTicket) {
        console.error('Shadow反面票根未找到');
        return;
      }
      
      // 使用html-to-image代替html2canvas
      const backDataUrl = await htmlToImage.toJpeg(shadowBackTicket, {
        quality: 0.92,
        pixelRatio: 2,
        backgroundColor: null
      });
      
      // 下载反面
      const backLink = document.createElement('a');
      backLink.download = `${movie?.title || 'movie'}_反面.jpg`;
      backLink.href = backDataUrl;
      backLink.click();
    } catch (error) {
      console.error('导出失败:', error);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* 后台截图容器 */}
      <div id="download-shadow-container" style={{ position: 'absolute', left: '-9999px', top: 0, opacity: 0, overflow: 'visible', width: '400px', height: '750px' }}>
        {/* 正面票根 - 后台截图用 */}
        <div id="shadow-front-ticket">
          <MovieTicket
            movie={movie}
            posterList={posterList}
            frontPosterIndex={frontPosterIndex}
            backPosterIndex={backPosterIndex}
            cinema={cinema}
            hall={hall}
            seat={seat}
            time={time}
            backgroundColor={backgroundColor}
            textColor={textColor}
            isFront={true}
            isRounded={isRounded}
          />
        </div>
        {/* 反面票根 - 后台截图用 */}
        <div id="shadow-back-ticket">
          <MovieTicket
            movie={movie}
            posterList={posterList}
            frontPosterIndex={frontPosterIndex}
            backPosterIndex={backPosterIndex}
            cinema={cinema}
            hall={hall}
            seat={seat}
            time={time}
            backgroundColor={backgroundColor}
            textColor={textColor}
            isFront={false}
            isRounded={isRounded}
          />
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 tracking-[0.2em] text-[#0F172A] drop-shadow-[2px_2px_0_rgba(0,0,0,0.1)]" style={{ fontFamily: 'AlimamaFangYuanTiVF-Thin-2, sans-serif' }}>电影票根生成器</h1>
          <p className="text-gray-600 text-lg font-semibold tracking-widest uppercase mt-6">定制你的个性化票根，留住每一场精彩</p>
        </div>
        <div className="flex flex-col md:flex md:flex-row md:items-start gap-8">
          {/* 左侧空白占位 */}
          <div className="hidden md:block w-[80px]"></div>
          {/* 左侧控制区 */}
          <div className="w-full md:w-[416px] space-y-6">
            <div className="bg-white/70 backdrop-blur-md rounded-lg border border-gray-200 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative z-50 transition-all duration-500">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Search className="mr-2" />
                搜索电影
              </h2>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
                  placeholder="输入电影名称..."
                />
                {isSearching ? (
                  <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-900 animate-spin" />
                ) : (
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                )}
                {error && (
                  <div className="mt-3 p-3 bg-red-100 text-red-700 rounded-lg">
                    <p className="text-sm font-medium">搜索出错</p>
                    <p className="text-xs mt-1">{error}</p>
                  </div>
                )}
                {searchResults.length > 0 && (
                  <div className="mt-3 bg-white border border-gray-200 rounded-lg shadow-lg absolute z-50 w-full max-h-60 overflow-y-auto">
                    {searchResults.map((result) => (
                      <div
                        key={result.id}
                        className="p-3 hover:bg-gray-100 cursor-pointer flex items-center transition-colors"
                        onClick={() => handleSelectMovie(result)}
                      >
                        {result.poster_path && (
                          <img
                            src={`https://image.tmdb.org/t/p/w185${result.poster_path}`}
                            alt={result.title}
                            width={40}
                            height={60}
                            className="mr-3 rounded object-cover"
                          />
                        )}
                        <div>
                          <p className="font-medium">{result.title}</p>
                          <p className="text-sm text-gray-500">{result.release_date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {searchQuery.length >= 2 && showNoMovieMessage && !isSearching && !error && !movie && searchResults.length === 0 && (
                  <div className="mt-3 p-3 bg-yellow-100 text-yellow-700 rounded-lg">
                    <p className="text-sm">抱歉，该电影暂未收录</p>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-white/70 backdrop-blur-md rounded-lg border border-gray-200 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Film className="mr-2" />
                票根信息
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">影院名称</label>
                  <input
                    type="text"
                    value={cinema}
                    onChange={(e) => setCinema(e.target.value)}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">放映厅</label>
                  <input
                    type="text"
                    value={hall}
                    onChange={(e) => setHall(e.target.value)}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">座位号</label>
                  <input
                    type="text"
                    value={seat}
                    onChange={(e) => setSeat(e.target.value)}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">放映时间</label>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
                    placeholder="例如：2024-01-01 19:30"
                  />
                </div>
              </div>
              <div className="mt-6">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none py-3 px-4 bg-gray-100 rounded-lg">
                    <span className="text-sm font-medium">样式设置</span>
                    <span className="transform transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <div className="mt-2 space-y-4 p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <label className="block text-[10px] text-slate-400 font-bold uppercase">开启圆角/倒角 (胶片感)</label>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isRounded}
                          onChange={(e) => setIsRounded(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                      </label>
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">背景颜色</label>
                      <div className="flex items-center">
                        <input
                          type="color"
                          value={backgroundColor}
                          onChange={(e) => {
                            setBackgroundColor(e.target.value);
                            const contrastTextColor = getContrastTextColor(e.target.value);
                            setTextColor(contrastTextColor);
                          }}
                          className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={backgroundColor}
                          onChange={(e) => {
                            setBackgroundColor(e.target.value);
                            const contrastTextColor = getContrastTextColor(e.target.value);
                            setTextColor(contrastTextColor);
                          }}
                          className="ml-3 flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">文字颜色</label>
                      <div className="flex items-center">
                        <input
                          type="color"
                          value={textColor}
                          onChange={(e) => setTextColor(e.target.value)}
                          className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={textColor}
                          onChange={(e) => setTextColor(e.target.value)}
                          className="ml-3 flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
                        />
                      </div>
                  </div>
                </div>
              </details>
              </div>
              <button
                onClick={(e) => handleExportTicket(e)}
                className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg flex items-center justify-center transition-all hover:scale-105 mt-6"
              >
                <Download className="mr-2" />
                生成并下载
              </button>
            </div>
          </div>
          {/* 右侧预览区 */}
          <div className="flex-1 flex flex-col items-center">
            <div className="w-full max-w-[416px] mx-auto bg-slate-100 pt-6 pb-10 px-8 rounded-2xl shadow-sm">
              <div className="flex mb-4 space-x-2">
                <button
                  onClick={() => setIsFront(true)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 ${isFront ? 'bg-black text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  正面
                </button>
                <button
                  onClick={() => setIsFront(false)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 ${!isFront ? 'bg-black text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  反面
                </button>
              </div>
              <div className="relative flex justify-center items-center">
                {/* 加载中提示 */}
                {isLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm rounded-lg z-50">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-primary font-medium">生成中...</p>
                  </div>
                )}
                {/* 正面票根 */}
                <div ref={frontTicketRef} className={`${isFront ? 'block' : 'hidden'}`}>
                  <MovieTicket
                    movie={movie}
                    posterList={posterList}
                    frontPosterIndex={frontPosterIndex}
                    backPosterIndex={backPosterIndex}
                    cinema={cinema}
                    hall={hall}
                    seat={seat}
                    time={time}
                    backgroundColor={backgroundColor}
                    textColor={textColor}
                    isFront={true}
                    isRounded={isRounded}
                  />
                </div>
                {/* 反面票根 */}
                <div ref={backTicketRef} className={`${!isFront ? 'block' : 'hidden'}`}>
                  <MovieTicket
                    movie={movie}
                    posterList={posterList}
                    frontPosterIndex={frontPosterIndex}
                    backPosterIndex={backPosterIndex}
                    cinema={cinema}
                    hall={hall}
                    seat={seat}
                    time={time}
                    backgroundColor={backgroundColor}
                    textColor={textColor}
                    isFront={false}
                    isRounded={isRounded}
                  />
                </div>
              </div>

              {/* 海报切换控制栏 */}
              {movie && posterList.length > 1 && (
                <div className="flex justify-center gap-4 mt-8">
                  <button
                    onClick={() => setFrontPosterIndex((prev) => (prev + 1) % posterList.length)}
                    className="text-sm text-slate-500 hover:text-slate-900 bg-white/50 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 shadow-sm transition-all"
                  >
                    🔄 换正面
                  </button>
                  <button
                    onClick={() => setBackPosterIndex((prev) => (prev + 1) % posterList.length)}
                    className="text-sm text-slate-500 hover:text-slate-900 bg-white/50 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 shadow-sm transition-all"
                  >
                    🔄 换背面
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* 底部信息 */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>使用 TMDB API 提供电影数据 | 仅用于个人收藏</p>
        </div>
      </div>
    </div>
  );
}