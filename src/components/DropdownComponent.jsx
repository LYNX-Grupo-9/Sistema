import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import icon from "../assets/icons/arrowDownIcon.svg"

export function DropdownComponent() {
    const [dropdownTitle, setDropdownTitle] = React.useState("Com Pendência")

    const handleChangeDropdownTitle = (title) => {
        setDropdownTitle(title)
    }
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (title) => {
        setAnchorEl(null);
        if (title) {
            handleChangeDropdownTitle(title);
        }
    };
    const handleAlternateClose = () => {
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
                    <span className='typography-medium text-[14px] text-[var(--color-blueLight)] flex justify-around w-full'>{dropdownTitle} <img src={icon}/></span>
                </div>
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleAlternateClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    className: 'flex flex-col gap-1 w-[260px]',
                }}
                PaperProps={{
                    className: 'border-2 border-[var(--color-blueLight)]',
                }}
            >
                <MenuItem
                    onClick={() => handleClose("Com Pendencia")}
                >
                    <span className='typography-medium text-[14px] text-[var(--color-blueLight)]'>Com Pendência</span>
                </MenuItem>
                <MenuItem
                    onClick={() => handleClose("Com pendencia 2")}
                >
                    <span className='typography-medium text-[14px] text-[var(--color-blueLight)]'>Com Pendência 2</span>
                </MenuItem>
                <MenuItem
                    onClick={() => handleClose("Com pendencia 3")}
                >
                    <span className='typography-medium text-[14px] text-[var(--color-blueLight)]'>Com Pendência 3</span>
                </MenuItem>
            </Menu>
        </div>
    );
}
