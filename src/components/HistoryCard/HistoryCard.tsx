import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ListItemIcon from '@mui/material/ListItemIcon';

dayjs.extend(calendar);

const HistoryCard = () => {
  return (
    <Card>
      <CardHeader
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title={dayjs().calendar()}
      />
      <CardContent>
        <List dense />
      </CardContent>
    </Card>
  );
};

export default HistoryCard;
