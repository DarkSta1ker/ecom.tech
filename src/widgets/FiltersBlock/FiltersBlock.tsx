import React, { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import { Button, Popover } from '@mui/material';
import styles from './FiltersBlock.module.css';
import { debounce } from '../../shared/utils/debounce';
import { FiltersPopoverContent } from './FiltersPopoverContent';
import { useFiltersPopover } from '../../hooks/useFiltersPopover';

interface FiltersBlockProps {
    value: string;
    onChange: (value: string) => void;
    total: number;
    minPrice: string;
    maxPrice: string;
    onMinPriceChange: (value: string) => void;
    onMaxPriceChange: (value: string) => void;
    selectedCategories: string[];
    onCategoriesChange: (value: string[]) => void;
    categories: string[];
    onResetFilters: () => void;
}

export const FiltersBlock: FC<FiltersBlockProps> = ({
                                                        value,
                                                        onChange,
                                                        total,
                                                        minPrice,
                                                        maxPrice,
                                                        onMinPriceChange,
                                                        onMaxPriceChange,
                                                        selectedCategories,
                                                        onCategoriesChange,
                                                        categories,
                                                        onResetFilters,
                                                    }) => {
    const [inpVal, setInpVal] = useState(value || '');

    useEffect(() => {
        setInpVal(value || '');
    }, [value]);

    const debouncedChange = useMemo(
        () =>
            debounce<string>((newValue: string) => {
                onChange(newValue);
            }, 300),
        [onChange]
    );

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setInpVal(newValue);
        debouncedChange(newValue);
    };

    const {
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
    } = useFiltersPopover({
        minPrice,
        maxPrice,
        selectedCategories,
        onMinPriceChange,
        onMaxPriceChange,
        onCategoriesChange,
        onResetFilters,
    });

    const activeFiltersCount =
        selectedCategories.length + Number(!!minPrice) + Number(!!maxPrice);

    return (
        <section className={styles.filtersBlock}>
            <div className={styles.filtersBlockContent}>
                <div className={styles.filtersBlockInfo}>
                    <h2 className={styles.filtersBlockTitle}>Поиск товаров</h2>
                    <p className={styles.filtersBlockCount}>Найдено: {total}</p>
                </div>

                <div className={styles.filtersBlockControls}>
                    <input
                        className={styles.filtersBlockInput}
                        type="text"
                        placeholder="Введите название товара..."
                        value={inpVal}
                        onChange={handleSearchChange}
                    />

                    <Button
                        variant="contained"
                        onClick={handleOpenFilters}
                        className={styles.filtersButton}
                    >
                        {activeFiltersCount > 0
                            ? `Фильтры (${activeFiltersCount})`
                            : 'Фильтры'}
                    </Button>
                </div>

                <Popover
                    open={isOpen}
                    anchorEl={anchorEl}
                    onClose={handleCloseFilters}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    slotProps={{
                        paper: {
                            className: styles.filtersPopoverPaper,
                        },
                    }}
                >
                    <FiltersPopoverContent
                        tempMinPrice={tempMinPrice}
                        tempMaxPrice={tempMaxPrice}
                        tempSelectedCategories={tempSelectedCategories}
                        categories={categories}
                        isCategoryMenuOpen={isCategoryMenuOpen}
                        onTempMinPriceChange={handleTempMinPriceChange}
                        onTempMaxPriceChange={handleTempMaxPriceChange}
                        onTempCategoriesChange={handleTempCategoriesChange}
                        onOpenCategoryMenu={() => setIsCategoryMenuOpen(true)}
                        onCloseCategoryMenu={() => setIsCategoryMenuOpen(false)}
                        onReset={handleResetTempFilters}
                        onApply={handleApplyFilters}
                        onKeyDown={handleFiltersKeyDown}
                    />
                </Popover>
            </div>
        </section>
    );
};
