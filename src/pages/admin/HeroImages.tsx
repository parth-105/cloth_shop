import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash, Plus, ArrowLeft, Save, X } from "lucide-react";
import { HeroImage, heroImages as initialHeroImages, updateHeroImages } from '@/lib/data';
import { Link } from 'react-router-dom';

const HeroImages = () => {
  const { toast } = useToast();
  const [images, setImages] = useState<HeroImage[]>([]);
  const [newImage, setNewImage] = useState({ url: '', title: '', subtitle: '' });
  const [editingImage, setEditingImage] = useState<HeroImage | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  useEffect(() => {
    setImages(initialHeroImages);
  }, []);

  const handleAdd = () => {
    if (!newImage.url || !newImage.title || !newImage.subtitle) {
      toast({
        title: "Error",
        description: "Please fill all fields",
        variant: "destructive",
      });
      return;
    }

    const image: HeroImage = {
      id: Date.now().toString(),
      ...newImage
    };

    const updatedImages = [...images, image];
    setImages(updatedImages);
    updateHeroImages(updatedImages);
    
    setNewImage({ url: '', title: '', subtitle: '' });
    setIsAddingNew(false);
    
    toast({
      title: "Success",
      description: "Hero image added successfully",
    });
  };

  const handleDelete = (id: string) => {
    const updatedImages = images.filter(img => img.id !== id);
    setImages(updatedImages);
    updateHeroImages(updatedImages);
    
    toast({
      title: "Success",
      description: "Hero image deleted successfully",
    });
  };

  const handleEdit = (image: HeroImage) => {
    setEditingImage(image);
  };

  const handleSaveEdit = () => {
    if (!editingImage) return;
    
    if (!editingImage.url || !editingImage.title || !editingImage.subtitle) {
      toast({
        title: "Error",
        description: "Please fill all fields",
        variant: "destructive",
      });
      return;
    }
    
    const updatedImages = images.map(img => 
      img.id === editingImage.id ? editingImage : img
    );
    
    setImages(updatedImages);
    updateHeroImages(updatedImages);
    
    setEditingImage(null);
    
    toast({
      title: "Success",
      description: "Hero image updated successfully",
    });
  };

  const handleCancelEdit = () => {
    setEditingImage(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/admin/dashboard" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl font-semibold">Hero Images Manager</h1>
            </div>
            <Button 
              onClick={() => {
                setIsAddingNew(true);
                setEditingImage(null);
              }}
              className="bg-mutedTeal hover:bg-mutedTeal/90"
              disabled={isAddingNew || editingImage !== null}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Image
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6">
        {(isAddingNew || editingImage) && (
          <Card className="p-6 mb-8 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {editingImage ? "Edit Hero Image" : "Add New Hero Image"}
              </h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setIsAddingNew(false);
                  setEditingImage(null);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                  </label>
                  <Input
                    placeholder="Enter image URL"
                    value={editingImage ? editingImage.url : newImage.url}
                    onChange={(e) => {
                      if (editingImage) {
                        setEditingImage({...editingImage, url: e.target.value});
                      } else {
                        setNewImage({...newImage, url: e.target.value});
                      }
                    }}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <Input
                    placeholder="Enter title"
                    value={editingImage ? editingImage.title : newImage.title}
                    onChange={(e) => {
                      if (editingImage) {
                        setEditingImage({...editingImage, title: e.target.value});
                      } else {
                        setNewImage({...newImage, title: e.target.value});
                      }
                    }}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subtitle
                  </label>
                  <Input
                    placeholder="Enter subtitle"
                    value={editingImage ? editingImage.subtitle : newImage.subtitle}
                    onChange={(e) => {
                      if (editingImage) {
                        setEditingImage({...editingImage, subtitle: e.target.value});
                      } else {
                        setNewImage({...newImage, subtitle: e.target.value});
                      }
                    }}
                  />
                </div>
                
                <div className="flex justify-end mt-4">
                  {editingImage ? (
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleSaveEdit}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={handleAdd}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Image
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                {(editingImage?.url || newImage.url) ? (
                  <div className="relative h-full">
                    <img 
                      src={editingImage ? editingImage.url : newImage.url} 
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-xl font-semibold mb-1">
                        {editingImage ? editingImage.title : newImage.title || "Title Preview"}
                      </h3>
                      <p>
                        {editingImage ? editingImage.subtitle : newImage.subtitle || "Subtitle Preview"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full p-8 text-gray-400">
                    <p>Image preview will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}

        <h2 className="text-xl font-semibold mb-4">All Hero Images</h2>
        
        {images.length === 0 ? (
          <div className="bg-white rounded-lg border p-8 text-center">
            <p className="text-gray-500 mb-4">No hero images added yet</p>
            <Button 
              variant="outline" 
              onClick={() => setIsAddingNew(true)}
              className="mx-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Image
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <Card key={image.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={image.url} 
                    alt={image.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10"></div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                  <p className="text-gray-600 mb-4">{image.subtitle}</p>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(image)}
                      disabled={editingImage !== null || isAddingNew}
                    >
                      <Pencil className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(image.id)}
                      disabled={editingImage !== null && editingImage.id === image.id}
                    >
                      <Trash className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroImages;
