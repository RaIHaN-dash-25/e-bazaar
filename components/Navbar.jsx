"use client";

import {
  MenuIcon,
  Search,
  XIcon,
  ChevronDownIcon,
  LayoutDashboardIcon,
  PackageIcon,
  StoreIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

const Navbar = () => {
  const router = useRouter();
  const { user, isSignedIn, isLoaded } = useUser();

  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [storeInfo, setStoreInfo] = useState(null);
  const [storeLoading, setStoreLoading] = useState(false);

  const cartCount = useSelector((state) => state.cart.total);

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    router.push(`/shop?search=${search}`);
    setMobileMenuOpen(false);
    setSearchOpen(false);
  };

  const fetchStoreInfo = async () => {
    if (!isSignedIn) return;

    try {
      setStoreLoading(true);

      const res = await fetch("/api/store", {
        cache: "no-store",
      });

      const data = await res.json();

      if (data.success) {
        setStoreInfo(data.store);
      }
    } catch (error) {
      console.error("FETCH_NAVBAR_STORE_ERROR:", error);
    } finally {
      setStoreLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchStoreInfo();
    }

    if (isLoaded && !isSignedIn) {
      setStoreInfo(null);
      setAccountDropdownOpen(false);
    }
  }, [isLoaded, isSignedIn]);

  const userDisplayName =
    user?.firstName ||
    user?.fullName ||
    user?.primaryEmailAddress?.emailAddress ||
    "User";

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setAccountDropdownOpen(false);
  };

  const StoreDropdownItem = () => {
    if (storeLoading) return null;

    if (!storeInfo) {
      return (
        <Link
          href="/create-store"
          onClick={closeMenus}
          className="flex items-center gap-2 px-4 py-2.5 hover:bg-ink-50 text-moss-600 text-sm"
        >
          <StoreIcon size={16} />
          Apply for a store
        </Link>
      );
    }

    if (storeInfo.status === "pending") {
      return (
        <div className="flex items-center gap-2 px-4 py-2.5 text-ochre-600 text-sm cursor-default">
          <StoreIcon size={16} />
          Store pending
        </div>
      );
    }

    if (storeInfo.status === "rejected") {
      return (
        <Link
          href="/create-store"
          onClick={closeMenus}
          className="flex items-center gap-2 px-4 py-2.5 hover:bg-ink-50 text-rust-500 text-sm"
        >
          <StoreIcon size={16} />
          Reapply for a store
        </Link>
      );
    }

    if (storeInfo.status === "approved" && storeInfo.isActive) {
      return (
        <Link
          href="/store"
          onClick={closeMenus}
          className="flex items-center gap-2 px-4 py-2.5 hover:bg-ink-50 text-moss-600 text-sm"
        >
          <StoreIcon size={16} />
          Store panel
        </Link>
      );
    }

    return null;
  };

  const AccountDropdown = ({ mobile = false }) => {
    return (
      <div className={mobile ? "w-full" : "relative"}>
        <button
          onClick={() => setAccountDropdownOpen((prev) => !prev)}
          className={`flex items-center gap-1.5 text-ink-700 text-sm ${
            mobile ? "w-full justify-between py-2" : "max-w-32 xl:max-w-40 truncate"
          }`}
        >
          <span className="w-6 h-6 rounded-full bg-clay-500 text-white text-[11px] flex items-center justify-center font-semibold shrink-0">
            {userDisplayName?.[0]?.toUpperCase() || "U"}
          </span>
          <span className="truncate">{userDisplayName}</span>
          <ChevronDownIcon size={14} className={`transition ${accountDropdownOpen ? "rotate-180" : ""}`} />
        </button>

        {accountDropdownOpen && (
          <div
            className={
              mobile
                ? "mt-2 border border-ink-200 rounded-2xl overflow-hidden bg-cream-50"
                : "absolute right-0 top-10 w-56 bg-cream-50 border border-ink-200 rounded-2xl shadow-lg overflow-hidden z-50"
            }
          >
            <Link href="/dashboard" onClick={closeMenus} className="flex items-center gap-2 px-4 py-2.5 hover:bg-ink-50 text-sm">
              <LayoutDashboardIcon size={16} />
              Dashboard
            </Link>
            <Link href="/orders" onClick={closeMenus} className="flex items-center gap-2 px-4 py-2.5 hover:bg-ink-50 text-sm">
              <PackageIcon size={16} />
              My orders
            </Link>
            <StoreDropdownItem />
          </div>
        )}
      </div>
    );
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/" },
    { label: "Contact", href: "/" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-cream-100">
      {/* Utility strip */}
      <div className="bg-ink-800 text-cream-100 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-8 flex items-center justify-between">
          <p className="hidden sm:block">Handpicked goods, delivered with care · free shipping over $50</p>
          <p className="sm:hidden">Free shipping over $50</p>
          <div className="hidden md:flex items-center gap-5 text-ink-200">
            <Link href="/" className="hover:text-cream-100">About</Link>
            <Link href="/" className="hover:text-cream-100">Contact</Link>
            <Link href="/pricing" className="hover:text-cream-100">Plus</Link>
          </div>
        </div>
      </div>

      {/* Main row */}
      <div className="bg-cream-50 border-b border-ink-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
          <Link href="/" onClick={closeMenus} className="shrink-0 font-display text-2xl sm:text-3xl text-ink-800">
            e-<span className="text-clay-500">bazaar</span>
            <span className="text-clay-500">.</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 text-sm text-ink-600">
            {navLinks.map((link, i) => (
              <span key={link.label} className="flex items-center">
                <Link href={link.href} className="px-3 py-2 hover:text-clay-600 transition">{link.label}</Link>
                {i < navLinks.length - 1 && <span className="text-ink-300">·</span>}
              </span>
            ))}
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            {/* Search */}
            <div className="hidden sm:block relative">
              {searchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center gap-2 bg-ink-50 border border-ink-200 rounded-full pl-4 pr-1.5 py-1.5">
                  <input
                    autoFocus
                    className="bg-transparent outline-none text-sm w-40 lg:w-56"
                    type="text"
                    placeholder="Search products"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onBlur={() => !search && setSearchOpen(false)}
                  />
                  <button type="submit" className="bg-clay-500 hover:bg-clay-600 transition text-white rounded-full p-1.5">
                    <Search size={14} />
                  </button>
                </form>
              ) : (
                <button onClick={() => setSearchOpen(true)} className="text-ink-600 hover:text-clay-600 transition p-2">
                  <Search size={19} />
                </button>
              )}
            </div>

            {/* Cart as a text pill instead of an icon badge */}
            {isSignedIn ? (
              <Link href="/cart" onClick={closeMenus} className="hidden sm:flex items-center gap-1.5 text-sm text-ink-700 border border-ink-200 rounded-full px-4 py-2 hover:border-clay-400 transition">
                Cart <span className="font-semibold text-clay-600">{cartCount}</span>
              </Link>
            ) : (
              <SignInButton mode="modal">
                <button className="hidden sm:flex items-center gap-1.5 text-sm text-ink-700 border border-ink-200 rounded-full px-4 py-2 hover:border-clay-400 transition">
                  Cart <span className="font-semibold text-clay-600">0</span>
                </button>
              </SignInButton>
            )}

            {!isSignedIn ? (
              <SignInButton mode="modal">
                <button className="hidden lg:block px-6 py-2.5 bg-ink-800 hover:bg-clay-600 transition text-white text-sm rounded-full">
                  Sign in
                </button>
              </SignInButton>
            ) : (
              <div className="hidden lg:flex items-center gap-4">
                <AccountDropdown />
                <SignOutButton>
                  <button className="text-sm text-ink-500 hover:text-rust-500 transition">Log out</button>
                </SignOutButton>
              </div>
            )}

            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-2 rounded-full text-ink-700 hover:bg-ink-100"
            >
              {mobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-cream-50 border-b border-ink-200">
          <div className="px-5 py-5 flex flex-col gap-4 text-ink-600">
            <form onSubmit={handleSearch} className="flex items-center gap-2 bg-ink-50 border border-ink-200 rounded-full px-4 py-2.5">
              <Search size={17} className="shrink-0" />
              <input
                className="w-full bg-transparent outline-none text-sm"
                type="text"
                placeholder="Search products"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>

            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} onClick={closeMenus} className="text-sm">{link.label}</Link>
            ))}

            {isSignedIn ? (
              <Link href="/cart" onClick={closeMenus} className="text-sm">Cart ({cartCount})</Link>
            ) : (
              <SignInButton mode="modal">
                <button className="text-left text-sm">Cart (0)</button>
              </SignInButton>
            )}

            {!isSignedIn ? (
              <SignInButton mode="modal">
                <button className="w-full px-6 py-2.5 bg-ink-800 text-white text-sm rounded-full">Sign in</button>
              </SignInButton>
            ) : (
              <>
                <AccountDropdown mobile />
                <SignOutButton>
                  <button className="w-full text-left text-sm text-rust-500">Log out</button>
                </SignOutButton>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
