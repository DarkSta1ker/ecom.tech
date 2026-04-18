import { useEffect, useState } from 'react';
import { SelectChangeEvent } from '@mui/material';

interface UseFiltersPopoverParams {
    minPrice: string;
    maxPrice: string;
    selectedCategories: string[];
    onMinPriceChange: (value: string) => void;
    onMaxPriceChange: (value: string) => void;
    onCategoriesChange: (value: string[]) => void;
    onResetFilters: () => void;
}

export const useFiltersPopover = ({
                                      minPrice,
                                      maxPrice,
                                      selectedCategories,
                                      onMinPriceChange,
                                      onMaxPriceChange,
                                      onCategoriesChange,
                                      onResetFilters,
                                  }: UseFiltersPopoverParams) => {
    const [tempMinPrice, setTempMinPrice] = useState(minPrice);
    const [tempMaxPrice, setTempMaxPrice] = useState(maxPrice);
    const [tempSelectedCategories, setTempSelectedCategories] = useState<string[]>(selectedCategories);

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

    const isOpen = Boolean(anchorEl);

    useEffect(() => {
        if (isOpen) {
            setTempMinPrice(minPrice);
            setTempMaxPrice(maxPrice);
            setTempSelectedCategories(selectedCategories);
        }
    }, [isOpen, minPrice, maxPrice, selectedCategories]);

    const handleOpenFilters = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseFilters = () => {
        setAnchorEl(null);
        setIsCategoryMenuOpen(false);

        setTimeout(() => {
            (document.activeElement as HTMLElement)?.blur();
        }, 0);
    };

    const handleTempMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTempMinPrice(e.target.value);
    };

    const handleTempMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTempMaxPrice(e.target.value);
    };

    const handleTempCategoriesChange = (event: SelectChangeEvent<string[]>) => {
        const value = event.target.value;
        setTempSelectedCategories(typeof value === 'string' ? value.split(',') : value);
    };

    const handleApplyFilters = () => {
        onMinPriceChange(tempMinPrice);
        onMaxPriceChange(tempMaxPrice);
        onCategoriesChange(tempSelectedCategories);
        handleCloseFilters();
    };

    const handleResetTempFilters = () => {
        onResetFilters();
        setTempMinPrice('');
        setTempMaxPrice('');
        setTempSelectedCategories([]);
    };

    const handleFiltersKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Escape') {
            event.preventDefault();
            event.stopPropagation();

            if (isCategoryMenuOpen) {
                setIsCategoryMenuOpen(false);
                return;
            }

            handleCloseFilters();
            return;
        }

        if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            handleApplyFilters();
        }
    };

    return {
        anchorEl,
        isOpen,
        isCategoryMenuOpen,
        tempMinPrice,
        tempMaxPrice,
        tempSelectedCategories,
        setIsCategoryMenuOpen,
        handleOpenFilters,
        handleCloseFilters,
        handleTempMinPriceChange,
        handleTempMaxPriceChange,
        handleTempCategoriesChange,
        handleApplyFilters,
        handleResetTempFilters,
        handleFiltersKeyDown,
    };
};
