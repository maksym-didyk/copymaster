import React, { FC, useState } from 'react';
import { AlertsTableRow } from '../AlertsTableRow/AlertsTableRow';
import { AlertsListTypeContent } from '../../../types/types';
import { client } from '../../../api/fetchClient';
import { toast } from 'react-toastify';
import FlipMove from 'react-flip-move';

interface Props {
  data?: AlertsListTypeContent,
  marketPrice: number
}

export const AlertsTableRows: FC<Props> = ({ data, marketPrice }) => {
  const [dataContent, setDataContent] = useState<AlertsListTypeContent[]>();

  const handleAlertDelete = async (currentId: number) => {
    try {
      const loadedData = await client.delete('/api/alert/' + currentId);

      if (loadedData === 1) {

        setDataContent((data) => data?.filter(({ id }) => id !== currentId));
        toast.success('Deleted successfully');
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  return (
    <FlipMove>
    {dataContent?.map((alert: AlertsListTypeContent) =>
      <div key={alert.id} className='mt-2' style={{ borderLeft: '1px solid transparent' } }>
        <AlertsTableRow
          data={alert}
          marketPrice={marketPrice}
          onDelete={handleAlertDelete}
        />
      </div>
    )}
    </FlipMove>
  );
};