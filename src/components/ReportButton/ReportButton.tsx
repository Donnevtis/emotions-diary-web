import React from 'react';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';

const ReportButton = () => {
  const { t } = useTranslation();

  return <Button>{t('buttons:getReport')}</Button>;
};

export default ReportButton;
