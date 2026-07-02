import { useState } from 'react';
import { Plus, UserCircle } from 'lucide-react';
import PageWrapper from '../../components/layout/PageWrapper';
import ProfileCard from '../../components/cards/ProfileCard';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import EmptyState from '../../components/ui/EmptyState';
import ProfileForm from '../../components/forms/ProfileForm';
import FadeIn from '../../components/animations/FadeIn';
import { useAppContext } from '../../layouts/MainLayout';

const ProfilesPage = () => {
  const { profiles, addProfile, updateProfile, deleteProfile } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);

  const handleCreate = () => {
    setEditingProfile(null);
    setIsModalOpen(true);
  };

  const handleEdit = (profile) => {
    setEditingProfile(profile);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProfile(id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingProfile) {
        await updateProfile(editingProfile.id || editingProfile._id, formData);
      } else {
        await addProfile(formData);
      }
      setIsModalOpen(false);
      setEditingProfile(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <PageWrapper>
      {/* Header */}
      <FadeIn>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Your Profiles
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              {profiles.length} profile{profiles.length !== 1 ? 's' : ''} created
            </p>
          </div>
          <Button icon={Plus} onClick={handleCreate}>
            Add Profile
          </Button>
        </div>
      </FadeIn>

      {/* Profiles Grid */}
      {profiles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {profiles.map((profile, index) => (
            <ProfileCard
              key={profile._id || profile.id || index}
              profile={profile}
              index={index}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={UserCircle}
          title="No profiles yet"
          description="Create your first professional profile to start generating resumes and cover letters."
          actionLabel="Create Profile"
          onAction={handleCreate}
        />
      )}

      {/* Profile Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProfile(null);
        }}
        title={editingProfile ? 'Edit Profile' : 'Create New Profile'}
        size="lg"
      >
        <ProfileForm
          initialData={editingProfile}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingProfile(null);
          }}
        />
      </Modal>
    </PageWrapper>
  );
};

export default ProfilesPage;
