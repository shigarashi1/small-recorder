import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import styles from './SampleCard.module.scss';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';

interface IProps {
  title?: string;
  contexts: string;
  onAction?: () => void;
  node: React.ReactNode;
}

type TProps = IProps;

const SampleCard: React.FC<TProps> = (props: TProps) => {
  const { title, contexts, onAction, node } = props;

  return (
    <Card id={styles.container} square={true}>
      {renderTitle()}
      <CardContent>{node}</CardContent>
      <CardContent>
        <Typography variant="body2">{contexts}</Typography>
      </CardContent>
      {renderAction()}
    </Card>
  );

  function renderTitle() {
    if (!title) {
      return null;
    }
    return <CardHeader title={title} />;
  }

  function renderAction() {
    if (!onAction) {
      return null;
    }
    return (
      <CardActions>
        <Button onClick={onAction}>Try</Button>
      </CardActions>
    );
  }
};

export default SampleCard;
