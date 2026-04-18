import React, { FC } from 'react';
import {
    Button,
    Checkbox,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    TextField,
} from '@mui/material';
import styles from './FiltersBlock.module.css';

interface FiltersPopoverContentProps {
    tempMinPrice: string;
    tempMaxPrice: string;
    tempSelectedCategories: string[];
    categories: string[];
    isCategoryMenuOpen: boolean;
    onTempMinPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onTempMaxPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onTempCategoriesChange: (event: SelectChangeEvent<string[]>) => void;
    onOpenCategoryMenu: () => void;
    onCloseCategoryMenu: () => void;
    onReset: () => void;
    onApply: () => void;
    onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

export const FiltersPopoverContent: FC<FiltersPopoverContentProps> = ({
                                                                          tempMinPrice,
                                                                          tempMaxPrice,
                                                                          tempSelectedCategories,
                                                                          categories,
                                                                          isCategoryMenuOpen,
                                                                          onTempMinPriceChange,
                                                                          onTempMaxPriceChange,
                                                                          onTempCategoriesChange,
                                                                          onOpenCategoryMenu,
                                                                          onCloseCategoryMenu,
                                                                          onReset,
                                                                          onApply,
                                                                          onKeyDown,
                                                                      }) => {
    return (
        <div
            className={styles.filtersPopover}
            onKeyDown={onKeyDown}
            tabIndex={-1}
        >
            <div className={styles.filtersPopoverHeader}>
                <h3>Фильтры</h3>
                <span>Настройте категории и цену</span>
            </div>

            <div className={styles.filtersPopoverFields}>
                <TextField
                    label="Мин. цена"
                    type="number"
                    value={tempMinPrice}
                    onChange={onTempMinPriceChange}
                    size="small"
                    fullWidth
                    className={styles.whiteField}
                />

                <TextField
                    label="Макс. цена"
                    type="number"
                    value={tempMaxPrice}
                    onChange={onTempMaxPriceChange}
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
                        onChange={onTempCategoriesChange}
                        open={isCategoryMenuOpen}
                        onOpen={onOpenCategoryMenu}
                        onClose={onCloseCategoryMenu}
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
                            <MenuItem
                                key={category}
                                value={category}
                                className={styles.selectMenuItem}
                            >
                                <Checkbox checked={tempSelectedCategories.includes(category)} />
                                <ListItemText primary={category} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            <div className={styles.filtersPopoverActions}>
                <Button variant="text" onClick={onReset} className={styles.resetButton}>
                    Сбросить
                </Button>
                <Button variant="contained" onClick={onApply} className={styles.doneButton}>
                    Готово
                </Button>
            </div>
        </div>
    );
};
