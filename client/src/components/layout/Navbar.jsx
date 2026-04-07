import React, {useState} from 'react';
import {
    Menu,
    BookOpenCheck,
    FileText,
    FolderPlus,
    FolderKanban,
    BookOpenText,
    NotepadText, Columns4, LogIn, IdCard, CircleUser, Loader2
} from 'lucide-react'
import {Button} from "@/components/ui/button"
import {Link, Navigate, useLocation} from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {useDispatch, useSelector} from "react-redux";
import {logout} from "@/features/user/userSlice.js";
import Loader from "@/components/ui/Loader.jsx";
import reactLogo from "../../assets/react.svg"
import {
    X,
    Users,
    Settings,
    LogOut,
    PanelLeftClose,
    PanelLeftOpen,
} from "lucide-react"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.jsx";

function Navbar() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const {pathname} = useLocation()
    //new
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const userMenuItems = [
        {name: "Sozlamalar", icon: Settings, href: "/profile/settings"},
        {name: "Chiqish", icon: LogOut, href: "/signin", danger: true},
    ]

    const loggedInLinks = [
        {
            path: '/gradelist',
            label: 'Test Yechish',
            icon: BookOpenCheck,
            roles: ['user', 'admin', 'bosh admin'],
        },

        {
            path: '/results',
            label: 'Natijalar',
            icon: NotepadText,
            roles: ['user', 'admin', 'bosh admin'],
        },
        {
            path: '/testtopdf',
            label: 'Test-Word',
            icon: FileText,
            roles: ['admin', 'bosh admin', 'user'],
        },
        {
            path: '/guide',
            label: "Qo'llanma",
            icon: BookOpenText,
            roles: ['bosh admin', 'admin', 'user']
        },
        {
            path: '/users',
            label: 'Foydalanuvchilar',
            icon: Users,
            roles: ['admin', 'bosh admin'],
        },
        {
            path: '/defining-grades',
            label: 'Savollar qo\'shish',
            icon: FolderPlus,
            roles: ['bosh admin', 'admin'],
        },
        {
            path: '/grademanagement',
            label: 'Sinflar boshqaruvi',
            icon: FolderKanban,
            roles: ['admin', 'bosh admin'],
        },
        {
            path: '/allresults',
            label: 'Barcha Natijalar',
            icon: Columns4,
            roles: ['bosh admin'],
        },

    ];

    const loggedOutLinks = [
        {
            path: '/guide',
            label: "Qo'llanma",
            icon: BookOpenText,
        },
        {
            path: '/signin',
            label: 'Kirish',
            icon: LogIn,
        },
        {
            path: '/signup',
            label: "Ro'yxatdan o'tish",
            icon: IdCard,
        },

    ];
    // Modified filteredLinks logic to handle loading state
    const filteredLinks = token
        ? user && user.role
            ? loggedInLinks.filter((link) => link.roles.some((role) => user.role === role))
            : loggedInLinks.filter((link) => link.roles.includes("user")) //default user access.
        : loggedOutLinks; // When not logged in, filteredLinks will be empty for the main section

    return (
        <div className="bg-gray-50 ">
            {/* Mobile sidebar */}
            <div className={`min-h-screen fixed inset-0 z-50 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}>
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}/>
                <div className="relative flex w-full max-w-xs h-full flex-col bg-white shadow-xl">
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <X className="h-6 w-6 text-white"/>
                        </Button>
                    </div>

                    <div className="flex flex-col h-full">
                        {/* Mobile Logo */}
                        <div className="flex flex-shrink-0 items-center border-b border-gray-200 bg-white">
                            <Link
                                to="/"
                                onClick={() => setSidebarOpen(false)}
                                className="flex items-center px-4 py-4 w-full h-full hover:bg-gray-50 transition-colors duration-200 group"
                            >
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-shadow duration-200">
                                    <img src={reactLogo} alt="Logo"/>
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-200">
                                    IT-FIZIKA
                                </h2>
                            </Link>
                        </div>

                        {/* Mobile Navigation - Full Height */}
                        <nav className="flex-1 overflow-y-auto py-4 px-3">
                            <div className="space-y-1">
                                {filteredLinks.map((item) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`group flex items-center px-3 py-3 text-base font-medium rounded-lg transition-colors duration-200 ${
                                            item.path===pathname
                                                ? "bg-blue-50 text-blue-700 border-l-4 border-blue-700"
                                                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                                        }`}
                                    >
                                        <item.icon
                                            className={`mr-4 h-6 w-6 flex-shrink-0 ${
                                                item.path===pathname ? "text-blue-700" : "text-gray-400 group-hover:text-gray-500"
                                            }`}
                                        />
                                        <span className="truncate">{item.label}</span>
                                    </Link>
                                ))}
                            </div>

                        </nav>

                        {/* Mobile User Menu - Sticky Bottom */}
                        {
                            token &&
                            <div className={`flex-shrink-0 border-t border-gray-200 bg-white `}>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost"
                                                className="w-full flex items-center justify-evenly p-4 h-auto hover:bg-gray-50">

                                            <Avatar className={`${sidebarCollapsed ? "h-8 w-8" : "h-9 w-9"} flex-shrink-0`}>
                                                <AvatarFallback>
                                                    <CircleUser className="w-full h-full " />
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="text-left flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                            </div>
                                            <div className="ml-2">
                                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor"
                                                     viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M19 9l-7 7-7-7"/>
                                                </svg>
                                            </div>
                                        </Button>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent
                                        className={`w-56 transition-all duration-200 ${sidebarCollapsed ? "hidden" : ""}`}
                                        align="end"
                                    >
                                        <DropdownMenuLabel className="font-normal">
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-medium leading-none">{user.name}</p>
                                                <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        {userMenuItems.map((item) => (
                                            <DropdownMenuItem
                                                asChild
                                                key={item.name}
                                                className={`${item.danger ? "text-red-600" : ""} cursor-pointer`}
                                                // onSelect={() => setSidebarOpen(false)}
                                            >
                                                <Link
                                                    to={item.href}
                                                    className="w-full h-full flex"
                                                    onClick={() => {
                                                        setSidebarOpen(false)
                                                        item.danger && dispatch(logout())
                                                    }}
                                                >
                                                    <item.icon className="mr-2 h-4 w-4" />
                                                    <span>{item.name}</span>
                                                </Link>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        }
                    </div>
                </div>
            </div>

            {/* Desktop sidebar */}
            <div
                className={`hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col transition-all duration-300 ${
                    sidebarCollapsed ? "lg:w-16" : "lg:w-64"
                }`}
            >
                <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white shadow-sm">
                    <div className="flex flex-col h-full">
                        {/* Logo Section - Different layouts for expanded/collapsed */}
                        {sidebarCollapsed ? (
                            <>
                                {/* Collapsed: Logo first, then button below */}
                                <div className="flex items-center justify-center border-b border-gray-200">
                                    <Link
                                        to="/"
                                        className="flex items-center justify-center px-3 py-4 w-full h-full hover:bg-gray-50 transition-colors duration-200 group"
                                        title="IT-FIZIKA"
                                    >
                                        <div className="w-9 h-9 rounded-lg flex items-center justify-center group-hover:scale-105 transition-all duration-200">
                                            <img src={reactLogo} alt="logo"/>
                                        </div>
                                    </Link>
                                </div>
                                <div className="flex items-center justify-center py-2 border-b border-gray-100">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setSidebarCollapsed(false)}
                                        className="h-8 w-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-all duration-200"
                                        title="Kengaytirmoq"
                                    >
                                        <PanelLeftOpen className="h-4 w-4"/>
                                    </Button>
                                </div>
                            </>
                        ) : (
                            /* Expanded: Logo and button on same level */
                            <div
                                className="flex flex-shrink-0 items-center justify-between border-b border-gray-200">
                                <Link
                                    to="/"
                                    className="flex items-center px-4 py-4 hover:bg-gray-50 transition-colors duration-200 group flex-1 min-w-0"
                                >
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-105 transition-all duration-200">
                                        <img src={reactLogo} alt="logo"/>
                                    </div>
                                    <h2 className="ml-3 text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-200 truncate">
                                        IT-FIZIKA
                                    </h2>
                                </Link>
                                <div className="px-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setSidebarCollapsed(true)}
                                        className="h-8 w-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-all duration-200"
                                        title="Kichiklashtirmoq"
                                    >
                                        <PanelLeftClose className="h-4 w-4"/>
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Navigation */}
                        <nav className="flex-1 space-y-1 px-2 py-3">
                            {
                                filteredLinks && filteredLinks?.map(item => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`group flex items-center rounded-lg transition-all duration-200 ${
                                            sidebarCollapsed ? "justify-center p-3" : "px-3 py-2.5"
                                        } ${
                                            item.path === pathname
                                                ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        }`}
                                        title={sidebarCollapsed ? item.label : ""}
                                    >
                                        <item.icon
                                            className={`${sidebarCollapsed ? "h-6 w-6" : "h-5 w-5 mr-3"} flex-shrink-0`}/>
                                        {!sidebarCollapsed && <span className="text-base font-medium">{item.label}</span>}
                                    </Link>
                                ))
                            }

                        </nav>

                        {/* User Menu */}
                        {
                            token &&
                            <div className="border-t border-gray-200 p-3">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className={`w-full transition-all duration-200 ${!user.email && `flex items-center justify-evenly`} hover:bg-gray-50 ${
                                                sidebarCollapsed ? "flex items-center justify-center  p-2 h-12" : "justify-start p-2.5 h-auto"
                                            }`}
                                            title={sidebarCollapsed ? user.name : ""}
                                        >
                                            <Avatar className={`${sidebarCollapsed ? "h-8 w-8" : "h-9 w-9"} flex-shrink-0`}>
                                                <AvatarFallback>
                                                    <CircleUser className="w-full h-full "/>
                                                </AvatarFallback>
                                            </Avatar>

                                            {
                                            user.email
                                                ?
                                                !sidebarCollapsed && (
                                                    <div className="text-left flex-1 ml-3 min-w-0">
                                                        <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                                                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                                    </div>
                                                )
                                                :
                                                    <div className={`ml-10`}>
                                                        <Loader variant={"small"}/>
                                                    </div>
                                            }
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56" align="end" forceMount>
                                        <DropdownMenuLabel className="font-normal">
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-medium leading-none">{user.name}</p>
                                                <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator/>
                                        {userMenuItems.map((item) => (
                                            <DropdownMenuItem key={item.name}
                                                              asChild
                                                              className={`${item.danger ? "text-red-600" : ""} cursor-pointer w-full h-full`}>
                                                <Link to={item.href} className={`flex w-full h-full`}
                                                      onClick={() => item.danger && dispatch(logout())}>
                                                    <item.icon className="mr-2 h-4 w-4"/>
                                                    <span>{item.name}</span>
                                                </Link>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        }

                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className={`transition-all duration-300 ${sidebarCollapsed ? "lg:pl-16" : "lg:pl-64"}`}>
                 {/*Mobile header */}
                <div className="sticky top-0 z-10 bg-white flex justify-center items-center hover:border-b hover:border-gray-300  lg:hidden">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-14 w-14"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu className="h-6 w-6" />
                    </Button>
                </div>
            </div>

        </div>
        // <nav className="bg-white shadow-md ">
        //     <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        //         <div className="flex justify-between h-16 items-center">
        //             <div className="flex items-center">
        //                 <Link to="/" className="flex-shrink-0 flex items-center  text-gray-700 hover:text-gray-900 ">
        //                     <img src={reactLogo} alt="logo" className={`mr-1`} width={"35.93"} height={"32"}/>
        //                     <span className="text-2xl font-bold">IT-FIZIKA</span>
        //                 </Link>
        //                 <div className="hidden sm:ml-6 xl:flex sm:items-center">
        //                     {filteredLinks.map((link) => (
        //                         <Link
        //                             key={link.path}
        //                             to={link.path}
        //                             className={cn(
        //                                 'px-4 py-2 rounded-md text-base   font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50'
        //                             )}
        //                         >
        //                             {link.label}
        //                         </Link>
        //                     ))}
        //                 </div>
        //             </div>
        //             <div className="flex items-center">
        //                 {!token ? (
        //                     <div className="hidden sm:ml-6 sm:items-center">
        //                         {loggedOutLinks.map((link) => (
        //                             <Link
        //                                 key={link.path}
        //                                 to={link.path}
        //                                 className={cn(
        //                                     'px-4 py-2 rounded-md text-base   font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50'
        //                                 )}
        //                             >
        //                                 {link.label}
        //                             </Link>
        //                         ))}
        //                     </div>
        //                 ) : (
        //                     <>
        //                         {user && user.name && (
        //                             <h5 className={`pr-2 lg:flex md:flex  2xl:flex xl:flex  gap-1 hidden`}>
        //                                 Hush kelibsiz, <b>{user.name}</b>
        //                             </h5>
        //                         )}
        //                         {user && user.name ? (
        //                             <DropdownMenu>
        //                                 <DropdownMenuTrigger asChild>
        //                                     <Button variant="secondary" size="icon" className="rounded-full">
        //                                         <CircleUserIcon className="h-5 w-5" />
        //                                         <span className="sr-only">Toggle user menu</span>
        //                                     </Button>
        //                                 </DropdownMenuTrigger>
        //                                 <DropdownMenuContent align="end">
        //                                     <DropdownMenuSeparator />
        //                                     <Link to={'/profile/settings'} className={`cursor-pointer`}>
        //                                         <DropdownMenuItem className={`cursor-pointer`}>Sozlamalar</DropdownMenuItem>
        //                                     </Link>
        //                                     <DropdownMenuSeparator />
        //                                     <Link to={'/signin'} className={`cursor-pointer`} onClick={() => dispatch(logout())}>
        //                                         <DropdownMenuItem className={`cursor-pointer`}>Chiqish</DropdownMenuItem>
        //                                     </Link>
        //                                 </DropdownMenuContent>
        //                             </DropdownMenu>
        //                         ) : <Loader variant={"small"}/> }
        //                     </>
        //                 )}
        //
        //                 <Sheet open={isOpen} onOpenChange={setIsOpen}>
        //                     <SheetTrigger asChild>
        //                         <Button
        //                             variant="ghost"
        //                             size="icon"
        //                             className="relative rounded-full xl:hidden"
        //                             aria-label="Main menu"
        //                         >
        //                             <Menu className="h-7 w-7" />
        //                         </Button>
        //                     </SheetTrigger>
        //                     <SheetContent side="right" className="w-[300px] xl:hidden pt-10">
        //                         <nav className="flex flex-col gap-4">
        //                             {!token ? (
        //                                 loggedOutLinks.map((link) => (
        //                                     <Link
        //                                         key={link.path}
        //                                         to={link.path}
        //                                         className={cn(
        //                                             'px-4 py-3 rounded-md text-lg font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50'
        //                                         )}
        //                                         onClick={() => setIsOpen(false)}
        //                                     >
        //                                         {link.label}
        //                                     </Link>
        //                                 ))
        //                             ) : (
        //                                 filteredLinks.map((link, index) => (
        //                                     <Link
        //                                         key={index}
        //                                         to={link.path}
        //                                         className={cn(
        //                                             'px-4 py-3 rounded-md text-lg font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50'
        //                                         )}
        //                                         onClick={() => setIsOpen(false)}
        //                                     >
        //                                         {link.label}
        //                                     </Link>
        //                                 ))
        //                             )}
        //                         </nav>
        //                     </SheetContent>
        //                 </Sheet>
        // {/*            </div>*/}
        // {/*        </div>*/}
        // {/*    </div>*/}
        // {/*</nav>*/}
    );
}

export default Navbar;