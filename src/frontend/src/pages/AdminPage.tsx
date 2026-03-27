import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Image as ImageIcon,
  LogIn,
  LogOut,
  Mail,
  MessageSquare,
  Shield,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { NavStar } from "../components/3d/StarScene";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

function AdminPortfolioTab() {
  return (
    <div
      className="text-center py-16 text-white/40"
      data-ocid="portfolio.empty_state"
    >
      <ImageIcon size={40} className="mx-auto mb-4 opacity-30" />
      <p>
        Portfolio management will be available once the backend is configured.
      </p>
    </div>
  );
}

function AdminTeamTab() {
  return (
    <div
      className="text-center py-16 text-white/40"
      data-ocid="team.empty_state"
    >
      <Users size={40} className="mx-auto mb-4 opacity-30" />
      <p>Team management will be available once the backend is configured.</p>
    </div>
  );
}

function AdminTestimonialsTab() {
  return (
    <div
      className="text-center py-16 text-white/40"
      data-ocid="testimonials.empty_state"
    >
      <MessageSquare size={40} className="mx-auto mb-4 opacity-30" />
      <p>
        Testimonials management will be available once the backend is
        configured.
      </p>
    </div>
  );
}

function AdminContactsTab() {
  return (
    <div
      className="text-center py-16 text-white/40"
      data-ocid="contacts.empty_state"
    >
      <Mail size={40} className="mx-auto mb-4 opacity-30" />
      <p>
        Contact submissions will be available once the backend is configured.
      </p>
    </div>
  );
}

export function AdminPage() {
  const { login, clear, loginStatus, identity, isLoggingIn } =
    useInternetIdentity();
  const { isFetching } = useActor();
  const isLoggedIn = !!identity;

  const handleLogin = async () => {
    try {
      await login();
    } catch {
      toast.error("Login failed. Please try again.");
    }
  };

  const handleLogout = () => {
    clear();
    toast.success("Logged out successfully.");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center px-4">
        <div
          className="glass-card rounded-3xl p-12 max-w-md w-full text-center"
          style={{ border: "1px solid rgba(200,162,90,0.2)" }}
          data-ocid="admin.panel"
        >
          <div className="flex justify-center mb-6">
            <NavStar />
          </div>
          <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-6">
            <Shield size={28} className="text-gold" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-white mb-2">
            Admin Panel
          </h1>
          <p className="text-white/50 text-sm mb-8">
            Sign in with Internet Identity to manage your Sparkle Faces website
            content.
          </p>
          <Button
            onClick={handleLogin}
            disabled={isLoggingIn || isFetching}
            className="w-full py-3 rounded-xl bg-gold hover:bg-gold-light text-dark font-semibold"
            data-ocid="admin.primary_button"
          >
            {isLoggingIn ? "Connecting..." : "Sign In with Internet Identity"}
            {!isLoggingIn && <LogIn size={16} className="ml-2" />}
          </Button>
          {loginStatus === "loginError" && (
            <p
              className="text-red-400 text-sm mt-4"
              data-ocid="admin.error_state"
            >
              Login failed. Please try again.
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark">
      <header className="glass-card border-b border-gold/15 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <NavStar />
          <span className="font-heading font-bold text-gold tracking-widest">
            SPARKLE FACES
          </span>
          <span className="text-white/40 text-sm ml-2">Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white/40 text-xs hidden sm:block">
            {identity.getPrincipal().toString().slice(0, 12)}...
          </span>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="border-gold/30 text-gold hover:bg-gold/10"
            data-ocid="admin.secondary_button"
          >
            <LogOut size={14} className="mr-1" /> Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        <Tabs defaultValue="portfolio">
          <TabsList className="bg-white/5 border border-white/10 mb-8">
            <TabsTrigger value="portfolio" data-ocid="admin.tab">
              Portfolio
            </TabsTrigger>
            <TabsTrigger value="team" data-ocid="admin.tab">
              Team
            </TabsTrigger>
            <TabsTrigger value="testimonials" data-ocid="admin.tab">
              Testimonials
            </TabsTrigger>
            <TabsTrigger value="contacts" data-ocid="admin.tab">
              Contacts
            </TabsTrigger>
          </TabsList>
          <TabsContent value="portfolio">
            <AdminPortfolioTab />
          </TabsContent>
          <TabsContent value="team">
            <AdminTeamTab />
          </TabsContent>
          <TabsContent value="testimonials">
            <AdminTestimonialsTab />
          </TabsContent>
          <TabsContent value="contacts">
            <AdminContactsTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
