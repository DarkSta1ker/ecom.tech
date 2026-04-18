import React, { FC, ChangeEvent, useEffect, useState } from 'react';
import styles from './FiltersBlock.module.css';
import { debounce } from '../../shared/utils/debounce';
import {
    Button,
    Checkbox,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Popover,
    Select,
    SelectChangeEvent,
    TextField,
} from '@mui/material';

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

    const [tempMinPrice, setTempMinPrice] = useState(minPrice);
    const [tempMaxPrice, setTempMaxPrice] = useState(maxPrice);
    const [tempSelectedCategories, setTempSelectedCategories] = useState<string[]>(selectedCategories);

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const isOpen = Boolean(anchorEl);

    useEffect(() => {
        setInpVal(value || '');
    }, [value]);

    useEffect(() => {
        if (isOpen) {
            setTempMinPrice(minPrice);
            setTempMaxPrice(maxPrice);
            setTempSelectedCategories(selectedCategories);
        }
    }, [isOpen, minPrice, maxPrice, selectedCategories]);

    const debouncedChange = React.useMemo(
        () => debounce<string>((newValue: string) => {
            onChange(newValue);
        }, 300),
        [onChange]
    );

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setInpVal(newValue);
        debouncedChange(newValue);
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

    const handleOpenFilters = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseFilters = () => {
        setAnchorEl(null);
    };

    const hasActiveFilters = !!minPrice || !!maxPrice || selectedCategories.length > 0;

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
                        {hasActiveFilters
                            ? `Фильтры (${selectedCategories.length + Number(!!minPrice) + Number(!!maxPrice)})`
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
                    <div className={styles.filtersPopover}>
                        <div className={styles.filtersPopoverHeader}>
                            <h3>Фильтры</h3>
                            <span>Настройте категории и цену</span>
                        </div>

                        <div className={styles.filtersPopoverFields}>
                            <TextField
                                label="Мин. цена"
                                type="number"
                                value={tempMinPrice}
                                onChange={handleTempMinPriceChange}
                                size="small"
                                fullWidth
                                className={styles.whiteField}
                            />

                            <TextField
                                label="Макс. цена"
                                type="number"
                                value={tempMaxPrice}
                                onChange={handleTempMaxPriceChange}
                                size="small"
                                fullWidth
                                className={styles.whiteField}
                            />

                            <FormControl fullWidth size="small" className={styles.whiteField}>
                                <InputLabel id="categories-select-label">Категории</InputLabel>
                                <Select
                                    labelId="categories-select-label"
                                    multiple
                                    value={tempSelectedCategories}
                                    onChange={handleTempCategoriesChange}
                                    input={<OutlinedInput label="Категории" />}
                                    renderValue={(selected) =>
                                        selected.length ? selected.join(', ') : 'Категории'
                                    }
                                    MenuProps={{
                                        slotProps: {
                                            paper: {
                                                className: styles.selectMenuPaper,
                                            },
                                        },
                                    }}
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category} value={category} className={styles.selectMenuItem}>
                                            <Checkbox checked={tempSelectedCategories.includes(category)} />
                                            <ListItemText primary={category} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>

                        <div className={styles.filtersPopoverActions}>
                            <Button variant="text" onClick={handleResetTempFilters} className={styles.resetButton}>
                                Сбросить
                            </Button>
                            <Button variant="contained" onClick={handleApplyFilters} className={styles.doneButton}>
                                Готово
                            </Button>
                        </div>
                    </div>
                </Popover>
            </div>
        </section>
    );
};
