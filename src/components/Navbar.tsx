import { useClerk } from "@clerk/clerk-react";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import * as React from 'react';
import { useUser } from "@clerk/clerk-react"

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const Navbar = () => {

    const { user } = useUser();

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
        return;
    }

    setState({ ...state, [anchor]: open });
    };

const list = (anchor: Anchor) => (
        <Box className="flex h-[100vh] justify-between flex-col" sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }} role="presentation" onClick={toggleDrawer(anchor, false)} onKeyDown={toggleDrawer(anchor, false)}>
            <List> 
                <a href="/home"><ListItem>
                    <div className='flex items-center cursor-pointer justify-center gap-3'>
                        <img className="h-[30px]" src="/home.svg" alt="home_icon" />
                        <h1 className='font-semibold text-[20px] mt-1 text-[#1b1b1b]'>Home</h1>
                    </div>
                </ListItem></a>
                <Divider className="bg-[#1b1b1b]" />
                <a href="/form"><ListItem>
                    <div className='flex items-center cursor-pointer justify-center gap-3'>
                        <img className="h-[30px]" src="/write.svg" alt="write_icon" />
                        <h1 className='font-semibold text-[20px] mt-1 text-[#1b1b1b]'>Write a blog</h1>
                    </div>
                </ListItem></a>
                <Divider className="bg-[#1b1b1b]" />
                <a href={`/blogs/${user?.fullName}`}><ListItem>
                    <div className='flex items-center cursor-pointer justify-center gap-3'>
                        <img className="h-[30px]" src="/myblog.svg" alt="myblog_icon" />
                        <h1 className='font-semibold text-[20px] mt-1 text-[#1b1b1b]'>My blogs</h1>
                    </div>
                </ListItem></a>
                <Divider className="bg-[#1b1b1b]" />
            </List>
            <List> 
                <Divider className="bg-[#ff4a4a]" />
                <ListItem onClick={() => signOut()}>
                    <div className='flex items-center cursor-pointer justify-center gap-3'>
                        <img className="h-[30px]" src="/logout.svg" alt="logout_icon" />
                        <h1 className='font-semibold text-[20px] mt-1 text-[#ff4a4a]'>Logout</h1>
                    </div>
                </ListItem>
            </List>
        </Box>
    );

    const { signOut } = useClerk();

    return (
        <div className="bg-[#1b1b1b]  py-5 sm:py-3 px-3 sm:px-4 flex justify-between items-center">
            <a href="/home"><img className="h-[55px] sm:h-[65px]" src="/logo.png" alt="Logo"/></a>
            {/* <div className="flex items-center gap-2">
                <button className="hidden sm:block py-2 px-4 font-bold border-2 border-[#ededed] bg-[#1b1b1b] text-[#ededed] rounded-full hover:bg-[#ededed] hover:text-[#1b1b1b] transition-all duration-700 shadow-2xl">Write what's on your mind</button>
                <button onClick={() => signOut()} className="py-2 px-4 w-[100px] font-bold border-2 border-[#ededed] bg-[#1b1b1b] text-[#ededed] rounded-full hover:bg-[#ededed] shadow-2xl hover:text-[#1b1b1b] transition-all duration-700">Logout</button>
            </div> */}
            <div className='!p-0'>
                {(['right'] as const).map((anchor) => (
                    <React.Fragment key={anchor}>
                    <Button className='!p-0 !m-0' onClick={toggleDrawer(anchor, true)}><img src="/menu.svg" className="cursor-pointer h-[40px]" alt="left_arrow"/></Button>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

export default Navbar;