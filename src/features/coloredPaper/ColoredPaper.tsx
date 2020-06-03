import React, { useState, FunctionComponent } from 'react';
import Paper from '@material-ui/core/Paper';
import styles from './ColoredPaper.module.module.css';

export function ColoredPaper({ color, children }: { color: string; children: FunctionComponent[] }) {
  return <Paper className={styles.green}>{...children}</Paper>;
}
