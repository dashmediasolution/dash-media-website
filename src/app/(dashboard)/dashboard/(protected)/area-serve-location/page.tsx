'use client';

import { useState, useEffect } from 'react';

type AreaServeLocation = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  heroHeading: string | null;
  heroSubheading: string | null;
  strategyHeading: string | null;
  strategySubheading: string | null;
  servicesHeading: string | null;
  workflowHeading: string | null;
  workflowSubheading: string | null;
  audienceHeading: string | null;
  audienceSubheading: string | null;
  faqHeading: string | null;
  faqSubheading: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  isActive: boolean;
};

const initialFormData = {
  id: '',
  name: '',
  slug: '',
  description: '',
  heroHeading: '',
  heroSubheading: '',
  strategyHeading: '',
  strategySubheading: '',
  servicesHeading: '',
  workflowHeading: '',
  workflowSubheading: '',
  audienceHeading: '',
  audienceSubheading: '',
  faqHeading: '',
  faqSubheading: '',
  metaTitle: '',
  metaDescription: '',
  isActive: true,
};

export default function AreaServeLocationAdminPage() {
  const [locations, setLocations] = useState<AreaServeLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState(initialFormData);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/area-serve-location', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setLocations(data);
      }
    } catch (error) {
      console.error('Failed to fetch locations', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = isEditing ? 'PUT' : 'POST';
    
    try {
      const res = await fetch('/api/area-serve-location', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormData(initialFormData);
        setIsEditing(false);
        fetchLocations();
      } else {
        let errorData;
        const rawText = await res.text();
        try {
          errorData = JSON.parse(rawText);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
          errorData = { error: `HTTP Error ${res.status}`, details: rawText };
        }
        console.error('Failed to save location:', errorData, rawText);
        alert(`Failed to save location: ${errorData.error || 'Unknown Error'}\n\nDetails: ${errorData.details || rawText || 'Check server logs'}`);
      }
    } catch (error) {
      console.error('Failed to save location', error);
    }
  };

  const handleEdit = (loc: AreaServeLocation) => {
    setFormData({
      id: loc.id,
      name: loc.name,
      slug: loc.slug,
      description: loc.description || '',
      heroHeading: loc.heroHeading || '',
      heroSubheading: loc.heroSubheading || '',
      strategyHeading: loc.strategyHeading || '',
      strategySubheading: loc.strategySubheading || '',
      servicesHeading: loc.servicesHeading || '',
      workflowHeading: loc.workflowHeading || '',
      workflowSubheading: loc.workflowSubheading || '',
      audienceHeading: loc.audienceHeading || '',
      audienceSubheading: loc.audienceSubheading || '',
      faqHeading: loc.faqHeading || '',
      faqSubheading: loc.faqSubheading || '',
      metaTitle: loc.metaTitle || '',
      metaDescription: loc.metaDescription || '',
      isActive: loc.isActive,
    });
    setIsEditing(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    let newSlug = formData.slug;
    // Auto-generate slug with 'marketing-agency-' prefix if it's a new entry
    if (!isEditing) {
      newSlug = 'marketing-agency-' + newName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }
    setFormData({ ...formData, name: newName, slug: newSlug });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this location?')) return;
    
    try {
      const res = await fetch(`/api/area-serve-location?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) fetchLocations();
    } catch (error) {
      console.error('Failed to delete location', error);
    }
  };

  const filteredLocations = locations.filter(loc => 
    loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loc.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredLocations.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLocations = filteredLocations.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Area Serve Locations</h1>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
        <h2 className="text-xl font-semibold">{isEditing ? 'Edit Location' : 'Add New Location'}</h2>
        
        <div className="space-y-6">
          <div className="border-b pb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Basic Info & Hero Section</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Location Name</label>
                <input type="text" required value={formData.name} onChange={handleNameChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. New York City" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Slug (URL Path)</label>
                <input type="text" required value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. area-serve-new-york" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Hero Heading</label>
                <input type="text" value={formData.heroHeading} onChange={(e) => setFormData({ ...formData, heroHeading: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. Fast, strategic digital growth for brands in New York." />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Hero Subheading</label>
                <textarea value={formData.heroSubheading} onChange={(e) => setFormData({ ...formData, heroSubheading: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500" rows={2} placeholder="e.g. We help local businesses scale through data-driven marketing..." />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Main Description / About Content</label>
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500" rows={4} placeholder="Expanded content explaining services offered in this location." />
              </div>
              <div className="md:col-span-2 flex items-center">
                <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <label className="ml-2 block text-sm text-gray-700">Set as Active</label>
              </div>
            </div>
          </div>

          {/* Page Content Sections */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Page Content Sections</h3>
            <div className="space-y-4">
              {/* Strategy Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Strategy Heading (Sec 2)</label>
                <input type="text" value={formData.strategyHeading} onChange={(e) => setFormData({ ...formData, strategyHeading: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500" placeholder="A clearer structure for your marketing..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Strategy Subheading (Sec 2)</label>
                <textarea value={formData.strategySubheading} onChange={(e) => setFormData({ ...formData, strategySubheading: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500" rows={2} placeholder="Instead of stacking disconnected tactics..." />
              </div>
              {/* Services Section */}
              <div className="pt-2">
                <label className="block text-sm font-medium text-gray-700">Services Heading (Sec 3)</label>
                <input type="text" value={formData.servicesHeading} onChange={(e) => setFormData({ ...formData, servicesHeading: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500" placeholder="Digital services built to move the right metrics." />
              </div>
              {/* Workflow Section */}
              <div className="pt-2">
                <label className="block text-sm font-medium text-gray-700">Workflow Heading (Sec 4)</label>
                <input type="text" value={formData.workflowHeading} onChange={(e) => setFormData({ ...formData, workflowHeading: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500" placeholder="A practical workflow that keeps strategy meaningful." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Workflow Subheading (Sec 4)</label>
                <textarea value={formData.workflowSubheading} onChange={(e) => setFormData({ ...formData, workflowSubheading: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500" rows={2} placeholder="We believe in clarity and structured execution..." />
              </div>
              {/* Audience Section */}
              <div className="pt-2">
                <label className="block text-sm font-medium text-gray-700">Audience Heading (Sec 5)</label>
                <input type="text" value={formData.audienceHeading} onChange={(e) => setFormData({ ...formData, audienceHeading: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500" placeholder="Relevant support for service brands..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Audience Subheading (Sec 5)</label>
                <textarea value={formData.audienceSubheading} onChange={(e) => setFormData({ ...formData, audienceSubheading: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500" rows={2} placeholder="We partner with organizations that are ready to scale..." />
              </div>
              {/* FAQ Section */}
              <div className="pt-2">
                <label className="block text-sm font-medium text-gray-700">FAQ Heading (Sec 6)</label>
                <input type="text" value={formData.faqHeading} onChange={(e) => setFormData({ ...formData, faqHeading: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500" placeholder="Frequently Asked Questions" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">FAQ Subheading (Sec 6)</label>
                <input type="text" value={formData.faqSubheading} onChange={(e) => setFormData({ ...formData, faqSubheading: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500" placeholder="Everything you need to know..." />
              </div>
            </div>
          </div>

          <div className="pb-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4">SEO & Meta Configuration</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Meta Title</label>
                <input type="text" value={formData.metaTitle} onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500" placeholder="SEO Title Tag" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Meta Description</label>
                <textarea value={formData.metaDescription} onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500" rows={2} placeholder="SEO Meta Description snippet" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-md shadow-sm hover:bg-blue-700 transition">
            {isEditing ? 'Update Location' : 'Save Location'}
          </button>
          {isEditing && (
            <button type="button" onClick={() => { setIsEditing(false); setFormData(initialFormData); }} className="bg-gray-100 text-gray-700 px-5 py-2 rounded-md shadow-sm hover:bg-gray-200 transition">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Data Table Section */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-6 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl font-semibold">Managed Locations</h2>
          <input
            type="text"
            placeholder="Search locations..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="block w-full sm:w-72 rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">Loading locations...</td></tr>
              ) : currentLocations.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">No locations found.</td></tr>
              ) : (
                currentLocations.map((loc) => (
                  <tr key={loc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{loc.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{loc.slug}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${loc.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {loc.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href={`/${loc.slug}`} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-900 mr-4 transition">View</a>
                      <button onClick={() => handleEdit(loc)} className="text-blue-600 hover:text-blue-900 mr-4 transition">Edit</button>
                      <button onClick={() => handleDelete(loc.id)} className="text-red-600 hover:text-red-900 transition">Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to <span className="font-medium">{Math.min(indexOfLastItem, filteredLocations.length)}</span> of <span className="font-medium">{filteredLocations.length}</span> results
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 bg-white rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-gray-300 bg-white rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
