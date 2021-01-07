import React, { Component, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import * as backend from '../../store/startingTest';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    borderRadius: '20px',
    backgroundColor: 'rgb(196, 196, 196)',
  },
  requirement: {
    backgroundColor: 'rgb(196, 196, 196)',
    borderRadius: '20px',
    marginBottom: '12px'
  },
  taskListContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflowY: 'auto',
  },
  flexibleCards: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflowY: 'auto',
    width: '100%',
    padding: '10px 0',
    marginBottom: '12px'
  },
  flexibleCard: {
    '&:not(:first-of-type)': {
      marginLeft: '16px'
    }
  },
  poorCard: {
    backgroundColor: '#fff',
    borderRadius: '20px',
    minWidth: '234px',
    maxWidth: '400px',
  },
  requirementCard: {
    maxWidth: '400px',
  },
  subCardHeader: {
    fontFamily: 'Roboto',
    fontSize: '14px',
    lineHeight: '15px',
    marginBottom: '6px'
  },
  startTaskButton: {
    borderRadius: '20px',
    backgroundColor: 'rgb(76, 79, 107)',
    color: 'white',
    alignSelf: 'center',
    '&:hover, &:focus': {
      backgroundColor: 'rgb(50, 50, 80)',
    },
  },
  hoverableWord: {
    '&:hover': {
      backgroundColor: '#0002',
      cursor: 'pointer'
    },
  }
});

export class RequirementsComponent extends Component {
  state = {
    requirements: null
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // запит
    this.setState({
      requirements: [
        {
          id: 1,
          text: "asd asd asd red"
        },
        {
          id: 2,
          text: "asd asd asd green"
        },
        {
          id: 3,
          text: "asd yellow, asd green hbjasf qwf asgqgw round"
        }
      ]
    });
  }

  onRequirementClicked = (text) => {
    this.props.viewText(text);
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        {this.state.requirements?.map((req, i) => 
          <Card className={classes.requirement} key={i} onClick={() => { this.onRequirementClicked(req.text) }}>
            <CardContent className={classes.taskListContent}>
              <Typography >
                { req.text }
              </Typography>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }
}

export const PoorWord = ({classes, word}) => {
  return (
    <span className={classes.hoverableWord}>{word.wordText} </span>
  )
}

export const PoorWords = () => {
  const [activeText, setActiveText] = useState();
  const classes = useStyles();

  const viewText = (text) => {
    const words = text.split(/[ ,.-:;]/).filter(word => word.length).map(word => {
      return {wordText: word};
    });
    setActiveText(words);
  };

  return (
    <>
      <Typography className={classes.pos}>Практичне завдання з визначення poor words</Typography>

      <Card className={classes.root}>
        <CardContent className={classes.taskListContent}>
          <div className={classes.flexibleCards}>
            <div className={classes.flexibleCard}>
              <Typography variant={'h6'} className={classes.subCardHeader}>
                Видобуті вимоги 
              </Typography>
              <Card className={[classes.poorCard, classes.requirementCard]}>
                <CardContent className={classes.taskListContent}>
                  <RequirementsComponent
                    classes={classes}
                    viewText={viewText}
                  />
                </CardContent>
              </Card>
            </div>
            <div className={classes.flexibleCard}>
              <Typography variant={'h6'} className={classes.subCardHeader}>
                Текст вимоги 
              </Typography>
              <Card className={classes.poorCard}>
                <CardContent className={classes.taskListContent}>
                  <div>
                    { activeText?.map((word, i) => 
                      <PoorWord 
                        classes={classes} 
                        word={word} 
                        key={i}
                      />
                    ) || 'no requirement selected' }
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className={classes.flexibleCard}>
              <Typography variant={'h6'} className={classes.subCardHeader}>
                Poor words
              </Typography>
              <Card className={classes.poorCard}>
                <CardContent className={classes.taskListContent}>
                  123
                </CardContent>
              </Card>
            </div>
          </div>

          <Button
            variant="contained"
            className={classes.startTaskButton}
          > 
            Завершити спробу
          </Button>
        </CardContent>
      </Card>
    </>
  );
}

const mapStateToProps = (state) => {
  const { loading, error, questions, questionId, result } = state.startingTest;

  return {
    loading,
    error,
    questions,
    questionId,
    result,
  };
};

export default connect(mapStateToProps)(PoorWords);
