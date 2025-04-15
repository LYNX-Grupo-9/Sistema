import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export function DropdownComponent() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <div className="bg-[var(--color-light)] w-[250px] h-[40px] flex items-center rounded-[8px] border-[var(--color-blueLight)] border-2 typography-bold text-[12px] justify-center">
                    <span className='typography-medium text-[14px] text-[var(--color-blueLight)]'>Com Pendência</span>
                </div>
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    className: 'flex flex-col gap-1 w-full',
                }}
                PaperProps={{
                    className: 'border-2 border-[var(--color-blueLight)]',
                }}
            >
                <MenuItem
                    onClick={handleClose}
                >
                    <span className='typography-medium text-[14px] text-[var(--color-blueLight)]'>Com Pendência</span>
                </MenuItem>
                <MenuItem
                    onClick={handleClose}
                >
                    <span className='typography-medium text-[14px] text-[var(--color-blueLight)]'>Com Pendência</span>
                </MenuItem>
                <MenuItem
                    onClick={handleClose}
                >
                    <span className='typography-medium text-[14px] text-[var(--color-blueLight)]'>Com Pendência</span>
                </MenuItem>
            </Menu>
        </div>
    );
}
