import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import * as backend from '../../store/taskList';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    borderRadius: '20px',
    backgroundColor: 'rgb(196, 196, 196)',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    color: 'rgb(68, 68, 68)',
  },
  taskCard: {
    borderRadius: '20px',
    backgroundColor: 'white',
  },
  taskCardContent: {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px !important',
  },
  taskListContent: {
    display: 'flex',
    flexWrap: 'wrap',
    maxHeight: '400px',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '20px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'white',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgb(76, 79, 107)',
    }
  },
  startTaskButton: {
    borderRadius: '20px',
    backgroundColor: 'rgb(76, 79, 107)',
    color: 'white',
    alignSelf: 'center',
    marginTop: '15px',
    '&:hover, &:focus': {
      backgroundColor: 'rgb(50, 50, 80)',
    },
  },
  cardItem: {
    flexBasis: '50%',
    padding: '10px',
  },
});

export function TaskCard({taskCardType, taskCardText, classes}) {
  return (
    <div className={classes.cardItem}>
      <Typography className={classes.pos}>{taskCardType}</Typography>

      <Card className={classes.taskCard}>
        <CardContent className={classes.taskCardContent}>
          <Typography className={classes.title}>
            {taskCardText}
          </Typography>

          <Button variant="contained" className={classes.startTaskButton}>Почати спробу</Button>
        </CardContent>
      </Card>
    </div>
  );
}

export class TaskListComponent extends Component {
  componentDidMount() {
    this.props.dispatch(backend.taskList());
  }

  render() {
    const { taskList, classes } = this.props;

    return (
      <div>
        <Typography className={classes.pos}>Модуль дисципліни "Аналіз вимог до програмного забезпечення"</Typography>

        <Card className={classes.root}>
          <CardContent className={classes.taskListContent}>
            {taskList.map((task) => (
              <TaskCard
                key={task.id}
                classes={classes}
                taskCardType={task.taskType}
                taskCardText={task.title}
              />  
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }
}

export function TaskList({ dispatch, error, loading, taskList }) {
  const classes = useStyles();

  return (
    <TaskListComponent
      dispatch={dispatch}
      taskList={taskList}
      loading={loading}
      error={error}
      classes={classes}
    />  
  );
}

const mapStateToProps = (state) => {
  const { loading, error, taskList } = state.taskList;

  return {
    loading,
    error,
    taskList,
  };
};

export default connect(mapStateToProps)(TaskList);

