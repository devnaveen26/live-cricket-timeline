
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { gallery, getTeamById, getPlayerById, getMatchById } from '@/data/mockData';
import { Calendar, Camera, Tag, X, ChevronLeft, ChevronRight, Award, Trophy, Medal } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('all');
  
  const filteredGallery = filter === 'all' 
    ? gallery 
    : gallery.filter(img => img.tags.includes(filter));
  
  const uniqueTags = Array.from(new Set(gallery.flatMap(img => img.tags)));
  
  const handleImageClick = (id: number) => {
    setSelectedImage(id);
    document.body.style.overflow = 'hidden';
  };
  
  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };
  
  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const currentIndex = filteredGallery.findIndex(img => img.id === selectedImage);
    if (currentIndex === -1) return;
    
    let newIndex: number;
    if (direction === 'prev') {
      newIndex = (currentIndex - 1 + filteredGallery.length) % filteredGallery.length;
    } else {
      newIndex = (currentIndex + 1) % filteredGallery.length;
    }
    
    setSelectedImage(filteredGallery[newIndex].id);
  };
  
  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowLeft') {
        navigateImage('prev');
      } else if (e.key === 'ArrowRight') {
        navigateImage('next');
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);
  
  const selectedGalleryImage = selectedImage !== null 
    ? gallery.find(img => img.id === selectedImage) 
    : null;
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="heading-lg mb-4">Tournament Gallery</h1>
              <p className="text-lg opacity-90">
                Celebrate the best moments and performances of the tournament
              </p>
            </div>
          </div>
          <div className="h-16 bg-gradient-to-b from-blue-800/0 to-gray-50"></div>
        </section>
        
        {/* Awards Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="heading-md mb-8 text-center">Tournament Awards</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                  <Trophy size={32} className="text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Player of the Tournament</h3>
                <div className="w-24 h-24 rounded-full mx-auto bg-gray-200 mb-3 overflow-hidden">
                  <img src="https://via.placeholder.com/300" alt="Player" className="w-full h-full object-cover" />
                </div>
                <h4 className="font-semibold text-lg">Virat Singh</h4>
                <p className="text-gray-600">Royal Challengers</p>
                <p className="mt-4 text-sm text-gray-700">
                  568 runs, 45.8 average, 148.5 SR
                </p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Award size={32} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Best Batsman</h3>
                <div className="w-24 h-24 rounded-full mx-auto bg-gray-200 mb-3 overflow-hidden">
                  <img src="https://via.placeholder.com/300" alt="Player" className="w-full h-full object-cover" />
                </div>
                <h4 className="font-semibold text-lg">Faf du Plessis</h4>
                <p className="text-gray-600">Super Kings</p>
                <p className="mt-4 text-sm text-gray-700">
                  625 runs, 42.6 average, 138.2 SR
                </p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Medal size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Best Bowler</h3>
                <div className="w-24 h-24 rounded-full mx-auto bg-gray-200 mb-3 overflow-hidden">
                  <img src="https://via.placeholder.com/300" alt="Player" className="w-full h-full object-cover" />
                </div>
                <h4 className="font-semibold text-lg">Trent Boult</h4>
                <p className="text-gray-600">Western Wolves</p>
                <p className="mt-4 text-sm text-gray-700">
                  24 wickets, 7.9 economy, 5/19 best
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Gallery Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="heading-md">Tournament Highlights</h2>
              <div className="flex space-x-2 overflow-x-auto pb-2 max-w-xs sm:max-w-md">
                <button
                  onClick={() => setFilter('all')}
                  className={`whitespace-nowrap px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    filter === 'all' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All Photos
                </button>
                
                {uniqueTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setFilter(tag)}
                    className={`whitespace-nowrap px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      filter === tag 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tag.charAt(0).toUpperCase() + tag.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGallery.map(image => (
                <div 
                  key={image.id}
                  className="group relative overflow-hidden rounded-lg shadow-sm cursor-pointer transition-transform hover:scale-[1.01]"
                  onClick={() => handleImageClick(image.id)}
                >
                  <img 
                    src={image.image} 
                    alt={image.caption} 
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                      <h3 className="font-semibold mb-1 text-balance">{image.caption}</h3>
                      <div className="flex items-center mb-2 text-sm opacity-90">
                        <Calendar size={14} className="mr-1" />
                        <span>{new Date(image.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {image.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Image Modal */}
        {selectedImage !== null && selectedGalleryImage && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={closeModal}>
            <div 
              className="relative max-w-4xl w-full rounded-lg overflow-hidden bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-1 hover:bg-black/70 z-10"
                onClick={closeModal}
              >
                <X size={24} />
              </button>
              
              <button 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 z-10"
                onClick={() => navigateImage('prev')}
              >
                <ChevronLeft size={24} />
              </button>
              
              <button 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 z-10"
                onClick={() => navigateImage('next')}
              >
                <ChevronRight size={24} />
              </button>
              
              <div className="relative">
                <img 
                  src={selectedGalleryImage.image} 
                  alt={selectedGalleryImage.caption} 
                  className="w-full object-contain max-h-[70vh]"
                />
              </div>
              
              <div className="p-6 bg-black text-white">
                <h3 className="text-xl font-semibold mb-2">{selectedGalleryImage.caption}</h3>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-4">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-1" />
                    <span>{new Date(selectedGalleryImage.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  
                  {selectedGalleryImage.matchId && (
                    <div className="flex items-center">
                      <Trophy size={16} className="mr-1" />
                      <span>
                        {getMatchById(selectedGalleryImage.matchId)?.team1Id && getMatchById(selectedGalleryImage.matchId)?.team2Id ? (
                          <>
                            {getTeamById(getMatchById(selectedGalleryImage.matchId)!.team1Id)?.shortName} vs {getTeamById(getMatchById(selectedGalleryImage.matchId)!.team2Id)?.shortName}
                          </>
                        ) : 'Match Details'}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {selectedGalleryImage.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-800 rounded-full text-xs font-medium flex items-center"
                    >
                      <Tag size={12} className="mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Gallery;
