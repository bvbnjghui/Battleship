import React, { useState, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';

const translations = {
    // General
    appTitle: { en: 'Battleship', zh: '海戰棋' },
    backToMenu: { en: 'Back to Menu', zh: '返回選單' },
    
    // Main Menu
    singlePlayer: { en: 'Single Player (vs AI)', zh: '單人遊戲 (對戰 AI)' },
    multiplayer: { en: 'Multiplayer (Player vs Player)', zh: '多人遊戲 (玩家對戰)' },
    settings: { en: 'Game Settings', zh: '遊戲設定' },
    instructions: { en: 'How to Play', zh: '遊戲說明' },
    records: { en: 'Game Records', zh: '遊玩紀錄' },

    // Ship Names
    carrier: { en: 'Carrier', zh: '航空母艦' },
    battleship: { en: 'Battleship', zh: '戰艦' },
    cruiser: { en: 'Cruiser', zh: '巡洋艦' },
    submarine: { en: 'Submarine', zh: '潛水艇' },
    destroyer: { en: 'Destroyer', zh: '驅逐艦' },
    
    // Instructions Page
    instructionsTitle: { en: 'How to Play', zh: '遊戲說明' },
    instructionsIntro: { en: 'Battleship is a classic strategy guessing game.', zh: '海戰棋是一款經典的策略猜謎遊戲。' },
    instructionsObjective: { en: 'Objective:', zh: '目標：' },
    instructionsObjectiveText: { en: 'Be the first to sink all of your opponent\'s ships.', zh: '率先擊沉對手的所有船艦。' },
    instructionsPlacementPhase: { en: 'Placement Phase:', zh: '佈局階段：' },
    instructionsPlacementText: { en: 'Place your ships on your grid. You can rotate ships by clicking the button or pressing \'R\'.', zh: '在您的板上放置設定好的船艦。您可以點擊按鈕或按 \'R\' 鍵來旋轉船艦，將其水平或垂直放置。' },
    instructionsCombatPhase: { en: 'Combat Phase:', zh: '戰鬥階段：' },
    instructionsCombatText: { en: 'Take turns firing at your opponent\'s grid.', zh: '輪流攻擊對方板上的格子。點擊「敵方戰艦」板上的格子來發射砲彈。' },
    instructionsHit: { en: 'Hit:', zh: '命中 (Hit)：' },
    instructionsHitText: { en: 'If you hit part of an enemy ship, the cell is marked with a red flame (🔥).', zh: '如果您擊中對方船艦的一部分，該格會標示為紅色火焰 (🔥)。' },
    instructionsMiss: { en: 'Miss:', zh: '未命中 (Miss)：' },
    instructionsMissText: { en: 'If you miss, the cell is marked with a white dot (●).', zh: '如果您未擊中，該格會標示為白色圓點 (●)。' },
    instructionsSunk: { en: 'Sunk:', zh: '擊沉 (Sunk)：' },
    instructionsSunkText: { en: 'When all parts of a ship have been hit, it is sunk and will be fully revealed.', zh: '當您擊中一艘船的所有部分，整艘船都會被標示出來，表示已擊沉。' },
    
    // Records Page
    recordsTitle: { en: 'Game Records (Single Player Only)', zh: '遊玩紀錄 (僅限單人模式)' },
    summary: { en: 'Summary', zh: '總覽' },
    wins: { en: 'Wins', zh: '勝利' },
    losses: { en: 'Losses', zh: '失敗' },
    statsByDifficulty: { en: 'Stats by Difficulty', zh: '各難度統計' },
    totalGames: { en: 'Total', zh: '總場次' },
    winRate: { en: 'Win Rate', zh: '勝率' },
    avgTurns: { en: 'Avg. Turns', zh: '平均回合數' },
    recentGames: { en: 'Recent Games', zh: '最近對局' },
    date: { en: 'Date', zh: '日期' },
    result: { en: 'Result', zh: '結果' },
    difficulty: { en: 'Difficulty', zh: '難度' },
    turns: { en: 'Turns', zh: '回合數' },
    accuracy: { en: 'Accuracy', zh: '命中率' },
    win: { en: 'Win', zh: '勝利' },
    loss: { en: 'Loss', zh: '失敗' },
    noRecords: { en: 'No game records yet. Play a single-player game to see your stats!', zh: '尚無遊玩紀錄。遊玩一局單人遊戲來查看您的統計資料！' },
    clearRecords: { en: 'Clear Records', zh: '清除紀錄' },
    confirmClearRecords: { en: 'Are you sure you want to clear all game records?', zh: '您確定要清除所有遊玩紀錄嗎？' },
    
    // Settings Page
    settingsTitle: { en: 'Game Settings', zh: '遊戲設定' },
    gridSize: { en: 'Grid Size:', zh: '棋盤大小:' },
    attackDelay: { en: 'Post-Attack Display Time:', zh: '攻擊後結果顯示時間:' },
    aiDifficulty: { en: 'AI Difficulty', zh: 'AI 難度' },
    easy: { en: 'Easy', zh: '簡單' },
    normal: { en: 'Normal', zh: '普通' },
    hard: { en: 'Hard', zh: '困難' },
    shipCounts: { en: 'Ship Counts', zh: '船艦數量' },
    length: { en: 'Length:', zh: '長度:' },
    saveSettings: { en: 'Save Settings', zh: '儲存設定' },
    resetToDefault: { en: 'Reset to Default', zh: '重設為預設' },
    confirmResetSettings: { en: 'Are you sure you want to reset all settings to their default values?', zh: '您確定要重設所有設定嗎？' },
    showCoordinates: { en: 'Show Coordinates', zh: '顯示座標'},
    on: { en: 'On', zh: '開啟'},
    off: { en: 'Off', zh: '關閉'},

    // Game Screen
    player: { en: 'Player', zh: '玩家' },
    you: { en: 'You', zh: '您' },
    ai: { en: 'AI', zh: 'AI' },
    yourFleet: { en: 'Your Fleet', zh: '您的艦隊' },
    enemyFleet: { en: 'Enemy Fleet', zh: '敵方戰艦' },
    playerFleet: { en: 'Player {playerNum}\'s Fleet', zh: '玩家 {playerNum} 的戰艦'},
    placeYourShip: { en: '{playerName}, place your {shipName} (length: {length} cells).', zh: '{playerName}，請放置您的 {shipName} (長度: {length} 格)。' },
    aiThinking: { en: 'AI is thinking...', zh: 'AI 正在思考...' },
    playerTurn: { en: '{playerName}\'s turn! Attack an enemy cell.', zh: '{playerName}的回合！請攻擊敵方格。' },
    switchingTurns: { en: 'Switching turns...', zh: '切換回合中...' },
    gameOver: { en: 'Game Over!', zh: '遊戲結束！' },
    winner: { en: '{playerName} wins!', zh: '{playerName} 贏了！' },
    rotateShip: { en: 'Rotate Ship', zh: '旋轉船艦' },
    horizontal: { en: 'Horizontal', zh: '水平' },
    vertical: { en: 'Vertical', zh: '垂直' },
    viewMyFleet: { en: 'View My Fleet', zh: '查看我的艦隊' },
    gamePaused: { en: 'Game Paused', zh: '遊戲暫停' },
    resumeGame: { en: 'Resume Game', zh: '繼續遊戲' },
    
    // Feedback Messages
    cannotPlaceShip: { en: 'Cannot place {shipName} here.', zh: '無法在此處放置 {shipName}。' },
    hit: { en: 'Hit!', zh: '命中！' },
    miss: { en: 'Miss.', zh: '未命中。' },
    sunkEnemyShip: { en: 'Sunk enemy\'s {shipName}!', zh: '擊沉了敵方的 {shipName}!' },
    aiSunkYourShip: { en: 'The AI sunk your {shipName}!', zh: 'AI 擊沉了您的 {shipName}!' },
    aiHit: { en: 'The AI hit your ship!', zh: 'AI 擊中了您的船艦！' },
    aiMiss: { en: 'The AI missed.', zh: 'AI 未命中。' },

    // Transition Screen
    switchPlayers: { en: 'Switch Players', zh: '請交換玩家' },
    p1DonePlacement: { en: 'Player 1 has finished setup. Please hand the device to Player 2.', zh: '玩家 1 已完成佈局。請將設備交給玩家 2。' },
    turnOver: { en: 'Turn over. Please hand the device to Player {playerNum}.', zh: '回合結束。請將設備交給玩家 {playerNum}。' },
    p2StartPlacement: { en: 'Player 2, Begin Setup', zh: '玩家 2 開始佈局' },
    playerStartTurn: { en: 'Player {playerNum}, Start Your Turn', zh: '玩家 {playerNum}，請按此處開始' },
};

const CELL_STATE = { EMPTY: 'empty', SHIP: 'ship', HIT: 'hit', MISS: 'miss', SUNK: 'sunk' };

const SHIP_CONFIG = [
  { name: 'carrier', length: 5 },
  { name: 'battleship', length: 4 },
  { name: 'cruiser', length: 3 },
  { name: 'submarine', length: 3 },
  { name: 'destroyer', length: 2 },
];

const DEFAULT_SETTINGS = {
    gridSize: 10,
    attackDelay: 1000,
    shipCounts: SHIP_CONFIG.reduce((acc, ship) => ({ ...acc, [ship.name]: 1 }), {}),
    aiDifficulty: 'normal',
    showCoordinates: false,
};

const createEmptyGrid = (gridSize) => Array.from({ length: gridSize }, () => Array.from({ length: gridSize }, () => ({ state: CELL_STATE.EMPTY, shipName: null })));

const placeShip = (grid, row, col, ship, isHorizontal) => {
    const newGrid = grid.map(r => r.map(cell => ({...cell})));
    for (let i = 0; i < ship.length; i++) {
        if (isHorizontal) newGrid[row][col + i] = { state: CELL_STATE.SHIP, shipName: ship.name };
        else newGrid[row + i][col] = { state: CELL_STATE.SHIP, shipName: ship.name };
    }
    return newGrid;
};

const canPlaceShip = (grid, row, col, length, isHorizontal, gridSize) => {
    if (isHorizontal) {
      if (col + length > gridSize) return false;
      for (let i = 0; i < length; i++) if (grid[row][col + i].state !== CELL_STATE.EMPTY) return false;
    } else {
      if (row + length > gridSize) return false;
      for (let i = 0; i < length; i++) if (grid[row + i][col].state !== CELL_STATE.EMPTY) return false;
    }
    return true;
};

const canPlaceShipWithBuffer = (grid, row, col, length, isHorizontal, gridSize) => {
    if (isHorizontal) {
        if (col + length > gridSize) return false;
    } else {
        if (row + length > gridSize) return false;
    }

    const startRow = Math.max(0, row - 1);
    const endRow = Math.min(gridSize - 1, isHorizontal ? row + 1 : row + length);
    const startCol = Math.max(0, col - 1);
    const endCol = Math.min(gridSize - 1, isHorizontal ? col + length : col + 1);
    
    for (let r = startRow; r <= endRow; r++) {
        for (let c = startCol; c <= endCol; c++) {
            if (grid[r][c].state !== CELL_STATE.EMPTY) return false;
        }
    }
    return true;
};


const createInitialShips = (settings, t) => {
    const ships = [];
    let idCounter = 0;
    for (const shipConfig of SHIP_CONFIG) {
        const count = settings.shipCounts[shipConfig.name] || 0;
        for (let i = 0; i < count; i++) {
            const baseName = t(shipConfig.name);
            const shipName = count > 1 ? `${baseName} #${i + 1}` : baseName;
            ships.push({
                ...shipConfig,
                name: shipName,
                baseName: shipConfig.name,
                id: idCounter++,
                hits: 0,
                placed: false,
            });
        }
    }
    return ships;
};

const MainMenu = ({ setView, startGame, t, toggleLanguage, language }) => (
  <div className="menu-container">
    <button className="lang-toggle" onClick={toggleLanguage}>{language === 'en' ? '中文' : 'English'}</button>
    <h1>{t('appTitle')}</h1>
    <button className="menu-button" onClick={() => startGame('single')}>{t('singlePlayer')}</button>
    <button className="menu-button" onClick={() => startGame('multiplayer')}>{t('multiplayer')}</button>
    <button className="menu-button" onClick={() => setView('settings')}>{t('settings')}</button>
    <button className="menu-button" onClick={() => setView('instructions')}>{t('instructions')}</button>
    <button className="menu-button" onClick={() => setView('records')}>{t('records')}</button>
  </div>
);

const Instructions = ({ setView, t }) => (
  <div className="page-container">
    <h2>{t('instructionsTitle')}</h2>
    <p>{t('instructionsIntro')}</p>
    <p><strong>{t('instructionsObjective')}</strong> {t('instructionsObjectiveText')}</p>
    <ul>
      <li><strong>{t('instructionsPlacementPhase')}</strong> {t('instructionsPlacementText')}</li>
      <li><strong>{t('instructionsCombatPhase')}</strong> {t('instructionsCombatText')}</li>
      <li><strong>{t('instructionsHit')}</strong> {t('instructionsHitText')}</li>
      <li><strong>{t('instructionsMiss')}</strong> {t('instructionsMissText')}</li>
      <li><strong>{t('instructionsSunk')}</strong> {t('instructionsSunkText')}</li>
    </ul>
    <button className="button-group" onClick={() => setView('menu')}>{t('backToMenu')}</button>
  </div>
);

const Records = ({ setView, t }) => {
    const [records, setRecords] = useState({ summary: { wins: 0, losses: 0 }, history: [] });

    useEffect(() => {
        const savedHistory = localStorage.getItem('battleshipGameHistory');
        if (savedHistory) {
            const history = JSON.parse(savedHistory);
            const wins = history.filter(r => r.result === 'win').length;
            const losses = history.filter(r => r.result === 'loss').length;
            setRecords({ summary: { wins, losses }, history });
        }
    }, []);

    const clearRecords = () => {
        if (window.confirm(t('confirmClearRecords'))) {
            localStorage.removeItem('battleshipGameHistory');
            setRecords({ summary: { wins: 0, losses: 0 }, history: [] });
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    const statsByDifficulty = ['easy', 'normal', 'hard'].reduce((acc, diff) => {
        acc[diff] = { wins: 0, losses: 0, turns: 0, total: 0 };
        return acc;
    }, {});

    records.history.forEach(record => {
        const diff = record.aiDifficulty;
        if (statsByDifficulty[diff]) {
            statsByDifficulty[diff].total++;
            statsByDifficulty[diff].turns += record.turns;
            if (record.result === 'win') {
                statsByDifficulty[diff].wins++;
            } else {
                statsByDifficulty[diff].losses++;
            }
        }
    });

    return (
        <div className="page-container">
            <h2>{t('recordsTitle')}</h2>

            <div className="records-summary">
                <div className="records-summary-item">
                    {t('wins')}
                    <span>{records.summary.wins}</span>
                </div>
                <div className="records-summary-item">
                    {t('losses')}
                    <span>{records.summary.losses}</span>
                </div>
            </div>

            <h3>{t('statsByDifficulty')}</h3>
            <div className="records-table-container">
                 <table className="records-table">
                    <thead>
                        <tr>
                            <th>{t('difficulty')}</th>
                            <th>{t('wins')}</th>
                            <th>{t('losses')}</th>
                            <th>{t('totalGames')}</th>
                            <th>{t('winRate')}</th>
                            <th>{t('avgTurns')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(statsByDifficulty).map(diffKey => {
                            const stats = statsByDifficulty[diffKey];
                            const winRate = stats.total > 0 ? (stats.wins / stats.total) * 100 : 0;
                            const avgTurns = stats.total > 0 ? stats.turns / stats.total : 0;
                            return (
                                <tr key={diffKey}>
                                    <td>{t(diffKey)}</td>
                                    <td>{stats.wins}</td>
                                    <td>{stats.losses}</td>
                                    <td>{stats.total}</td>
                                    <td>{winRate.toFixed(1)}%</td>
                                    <td>{avgTurns.toFixed(1)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <h3>{t('recentGames')}</h3>
            <div className="records-table-container">
                {records.history.length > 0 ? (
                    <table className="records-table">
                        <thead>
                            <tr>
                                <th>{t('date')}</th>
                                <th>{t('result')}</th>
                                <th>{t('difficulty')}</th>
                                <th>{t('turns')}</th>
                                <th>{t('accuracy')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.history.map((record, index) => (
                                <tr key={index}>
                                    <td>{formatDate(record.date)}</td>
                                    <td className={record.result === 'win' ? 'result-win' : 'result-loss'}>
                                        {t(record.result)}
                                    </td>
                                    <td>{t(record.aiDifficulty)}</td>
                                    <td>{record.turns}</td>
                                    <td>{record.accuracy.toFixed(1)}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>{t('noRecords')}</p>
                )}
            </div>

            <div className="button-group">
                {records.history.length > 0 && <button onClick={clearRecords}>{t('clearRecords')}</button>}
                <button onClick={() => setView('menu')}>{t('backToMenu')}</button>
            </div>
        </div>
    );
};

const Settings = ({ initialSettings, onSave, setView, t }) => {
    const [settings, setSettings] = useState(initialSettings);

    const handleSave = () => {
        onSave(settings);
        setView('menu');
    };
    
    const handleReset = () => {
        if(window.confirm(t('confirmResetSettings'))) {
            setSettings(DEFAULT_SETTINGS);
        }
    }

    const handleShipCountChange = (shipName, count) => {
        const newCount = Math.max(0, Math.min(5, count));
        setSettings(prev => ({ ...prev, shipCounts: { ...prev.shipCounts, [shipName]: newCount } }));
    };

    return (
        <div className="page-container settings-container">
            <h2>{t('settingsTitle')}</h2>
            <div className="setting-row">
                <label>{t('gridSize')} {settings.gridSize}x{settings.gridSize}</label>
                <input type="range" min="8" max="15" value={settings.gridSize} onChange={e => setSettings({...settings, gridSize: parseInt(e.target.value)})} />
            </div>
             <div className="setting-row">
                <label>{t('attackDelay')} {(settings.attackDelay / 1000).toFixed(1)}s</label>
                <input type="range" min="500" max="3000" step="100" value={settings.attackDelay} onChange={e => setSettings({...settings, attackDelay: parseInt(e.target.value)})} />
            </div>
            <div className="setting-row">
                <label>{t('showCoordinates')}</label>
                <div className="button-group-toggle">
                    <button className={settings.showCoordinates ? 'active' : ''} onClick={() => setSettings(s => ({...s, showCoordinates: true}))}>{t('on')}</button>
                    <button className={!settings.showCoordinates ? 'active' : ''} onClick={() => setSettings(s => ({...s, showCoordinates: false}))}>{t('off')}</button>
                </div>
            </div>
             <div className="setting-row">
                <label>{t('aiDifficulty')}</label>
                <div className="button-group-toggle">
                    <button className={settings.aiDifficulty === 'easy' ? 'active' : ''} onClick={() => setSettings(s => ({...s, aiDifficulty: 'easy'}))}>{t('easy')}</button>
                    <button className={settings.aiDifficulty === 'normal' ? 'active' : ''} onClick={() => setSettings(s => ({...s, aiDifficulty: 'normal'}))}>{t('normal')}</button>
                    <button className={settings.aiDifficulty === 'hard' ? 'active' : ''} onClick={() => setSettings(s => ({...s, aiDifficulty: 'hard'}))}>{t('hard')}</button>
                </div>
            </div>
            <h3>{t('shipCounts')}</h3>
            {SHIP_CONFIG.map(ship => (
                 <div className="setting-row" key={ship.name}>
                    <label>{t(ship.name)} ({t('length')} {ship.length})</label>
                    <input type="number" value={settings.shipCounts[ship.name] || 0} onChange={e => handleShipCountChange(ship.name, parseInt(e.target.value))} min="0" max="5" />
                </div>
            ))}
            <div className="button-group">
                <button onClick={handleSave}>{t('saveSettings')}</button>
                <button onClick={handleReset}>{t('resetToDefault')}</button>
                <button onClick={() => setView('menu')}>{t('backToMenu')}</button>
            </div>
        </div>
    );
};

const GridDisplay = ({ grid, gridSize, onCellClick, isEnemy, onGridMouseMove, onGridLeave, previewCells, gameState, alwaysShowShips, showCoordinates }) => {
    const previewCoords = new Map(previewCells.map(c => [c.coord, c.possible]));
    const topCoords = Array.from({ length: gridSize }, (_, i) => String.fromCharCode(65 + i));
    const leftCoords = Array.from({ length: gridSize }, (_, i) => i + 1);

    return (
      <div className={`grid-wrapper ${showCoordinates ? 'with-coords' : ''}`} style={{ '--grid-size': gridSize } as React.CSSProperties}>
        {showCoordinates && (
            <>
                <div className="coords-top">
                    {topCoords.map(label => <div key={label} className="coord-label-top">{label}</div>)}
                </div>
                <div className="coords-left">
                    {leftCoords.map(label => <div key={label} className="coord-label-left">{label}</div>)}
                </div>
            </>
        )}
        <div className={`grid ${isEnemy ? 'enemy-board' : 'player-board'}`} onMouseMove={onGridMouseMove} onMouseLeave={onGridLeave}>
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              const coord = `${rowIndex}-${colIndex}`;
              const isPreview = !isEnemy && previewCoords.has(coord);
              const previewClass = isPreview ? (previewCoords.get(coord) ? 'preview-possible' : 'preview-impossible') : '';
              const cellState = cell.state !== CELL_STATE.EMPTY && (isEnemy ? (cell.state !== CELL_STATE.SHIP) : (alwaysShowShips || gameState === 'placement' || cell.state !== CELL_STATE.SHIP)) ? cell.state : '';
              return (<div key={coord} data-row={rowIndex} data-col={colIndex} className={`cell ${cellState} ${previewClass}`} onClick={() => onCellClick(rowIndex, colIndex)} />);
            })
          )}
        </div>
      </div>
    );
};

const FleetModal = ({ grid, gridSize, onClose, gameState, t, showCoordinates }) => (
    <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={onClose}>&times;</button>
            <h2>{t('yourFleet')}</h2>
            <GridDisplay grid={grid} gridSize={gridSize} onCellClick={() => {}} isEnemy={false} onGridMouseMove={() => {}} onGridLeave={() => {}} previewCells={[]} gameState={gameState} alwaysShowShips={true} showCoordinates={showCoordinates} />
        </div>
    </div>
);

const TransitionScreen = ({ message, buttonText, onReady, t }) => (
    <div className="transition-screen">
        <h2>{t('switchPlayers')}</h2>
        <p>{message}</p>
        <button onClick={onReady}>{buttonText}</button>
    </div>
);

const PauseMenu = ({ onResume, onBackToMenu, t }) => (
    <div className="modal-overlay">
        <div className="modal-content pause-menu">
            <h2>{t('gamePaused')}</h2>
            <button onClick={onResume}>{t('resumeGame')}</button>
            <button onClick={onBackToMenu}>{t('backToMenu')}</button>
        </div>
    </div>
);

const GameOverModal = ({ winnerName, onBackToMenu, t }) => (
    <div className="modal-overlay">
        <div className="modal-content game-over-modal">
            <h2>{t('gameOver')}</h2>
            <p>{t('winner', { playerName: winnerName })}</p>
            <button onClick={onBackToMenu}>{t('backToMenu')}</button>
        </div>
    </div>
);

const Game = ({ setView, gameMode, settings, t }) => {
  const { gridSize, attackDelay, aiDifficulty, showCoordinates } = settings;
  const initialShips = useCallback(() => createInitialShips(settings, t), [settings, t]);
  const emptyGrid = useCallback(() => createEmptyGrid(gridSize), [gridSize]);

  const [gameState, setGameState] = useState('placement'); // 'placement', 'battle', 'showing_attack_result', 'turn_switching', 'transition', 'game_over'
  const [activePlayer, setActivePlayer] = useState(1);
  const [player1Grid, setPlayer1Grid] = useState(emptyGrid);
  const [player2Grid, setPlayer2Grid] = useState(emptyGrid);
  const [player1Ships, setPlayer1Ships] = useState(initialShips);
  const [player2Ships, setPlayer2Ships] = useState(initialShips);
  const [placementIndex, setPlacementIndex] = useState(0);
  const [placementOrientation, setPlacementOrientation] = useState('horizontal');
  const [status, setStatus] = useState('');
  const [feedback, setFeedback] = useState('');
  const [aiShots, setAiShots] = useState(new Set());
  const [previewCells, setPreviewCells] = useState([]);
  const [hoveredCell, setHoveredCell] = useState(null);
  const [showFleetModal, setShowFleetModal] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [winnerName, setWinnerName] = useState('');
  const [aiTargetingInfo, setAiTargetingInfo] = useState({ mode: 'hunting', hits: [] });
  // New states for detailed stats
  const [player1Shots, setPlayer1Shots] = useState(0);
  const [player1Hits, setPlayer1Hits] = useState(0);

  const shipsToPlace = activePlayer === 1 ? player1Ships : player2Ships;
  const totalShipsToPlace = shipsToPlace.length;

  const placeAiShips = useCallback(() => {
    const ships = initialShips();
    let aiGrid = emptyGrid();

    const shipsToPlace = [...ships].sort((a, b) => b.length - a.length);
    const placedShips = [];

    for (const ship of shipsToPlace) {
        let placed = false;
        let attempts = 0;

        while (!placed && attempts < 150) {
            const isHorizontal = Math.random() < 0.5;
            const row = Math.floor(Math.random() * gridSize);
            const col = Math.floor(Math.random() * gridSize);
            if (canPlaceShipWithBuffer(aiGrid, row, col, ship.length, isHorizontal, gridSize)) {
                aiGrid = placeShip(aiGrid, row, col, ship, isHorizontal);
                placedShips.push({ ...ship, placed: true });
                placed = true;
            }
            attempts++;
        }

        if (!placed) {
            attempts = 0;
            while (!placed && attempts < 250) {
                const isHorizontal = Math.random() < 0.5;
                const row = Math.floor(Math.random() * gridSize);
                const col = Math.floor(Math.random() * gridSize);
                if (canPlaceShip(aiGrid, row, col, ship.length, isHorizontal, gridSize)) {
                    aiGrid = placeShip(aiGrid, row, col, ship, isHorizontal);
                    placedShips.push({ ...ship, placed: true });
                    placed = true;
                }
                attempts++;
            }
        }
        
        if (!placed) {
             console.error(`CRITICAL: Could not place AI ship ${ship.name}. The game settings might be impossible.`);
             placedShips.push({ ...ship, placed: false });
        }
    }
    
    const finalShips = ships.map(originalShip => 
        placedShips.find(ps => ps.id === originalShip.id) || originalShip
    );

    setPlayer2Grid(aiGrid);
    setPlayer2Ships(finalShips);
  }, [emptyGrid, initialShips, gridSize]);

  useEffect(() => { if (gameMode === 'single') placeAiShips(); }, [gameMode, placeAiShips]);
  useEffect(() => { if (feedback) { const timer = setTimeout(() => setFeedback(''), 1500); return () => clearTimeout(timer); } }, [feedback]);
  
  const handleAiTurn = useCallback(() => {
    let row, col;
    const { mode, hits } = aiTargetingInfo;

    const isTargeting = (aiDifficulty === 'normal' || aiDifficulty === 'hard') && mode === 'targeting' && hits.length > 0;

    if (isTargeting) {
        const potentialTargets = new Set<string>();
        const addTarget = (r, c) => {
            if (r >= 0 && r < gridSize && c >= 0 && c < gridSize && !aiShots.has(`${r},${c}`)) {
                potentialTargets.add(`${r},${c}`);
            }
        };

        if (hits.length === 1) {
            const { row: r, col: c } = hits[0];
            addTarget(r - 1, c); addTarget(r + 1, c); addTarget(r, c - 1); addTarget(r, c + 1);
        } else {
            hits.sort((a, b) => a.row - b.row || a.col - b.col);
            const firstHit = hits[0];
            const lastHit = hits[hits.length - 1];
            const isHorizontal = firstHit.row === lastHit.row;

            if (isHorizontal) {
                addTarget(firstHit.row, firstHit.col - 1);
                addTarget(lastHit.row, lastHit.col + 1);
            } else {
                addTarget(firstHit.row - 1, firstHit.col);
                addTarget(lastHit.row + 1, lastHit.col);
            }
        }

        const validTargets = Array.from(potentialTargets);
        if (validTargets.length > 0) {
            const targetCoord = validTargets[Math.floor(Math.random() * validTargets.length)];
            [row, col] = targetCoord.split(',').map(Number);
        } else {
            setAiTargetingInfo({ mode: 'hunting', hits: [] });
        }
    }

    if (row === undefined || col === undefined) {
        let availableCells = [];
        if (aiDifficulty === 'hard') {
            const primaryPattern = [];
            const secondaryPattern = [];
            for (let r = 0; r < gridSize; r++) {
                for (let c = 0; c < gridSize; c++) {
                    if (!aiShots.has(`${r},${c}`)) {
                        if ((r + c) % 2 === 0) primaryPattern.push({ r, c });
                        else secondaryPattern.push({ r, c });
                    }
                }
            }
            availableCells = primaryPattern.length > 0 ? primaryPattern : secondaryPattern;
        } else {
            for (let r = 0; r < gridSize; r++) {
                for (let c = 0; c < gridSize; c++) {
                    if (!aiShots.has(`${r},${c}`)) availableCells.push({ r, c });
                }
            }
        }
        
        if (availableCells.length > 0) {
            const target = availableCells[Math.floor(Math.random() * availableCells.length)];
            row = target.r;
            col = target.c;
        } else {
            console.error("AI has no more moves!");
            return;
        }
    }

    setAiShots(s => new Set(s).add(`${row},${col}`));
    
    let newGrid = player1Grid.map(r => r.map(c => ({...c})));
    let newShips = JSON.parse(JSON.stringify(player1Ships));
    const cell = newGrid[row][col];
    let justSunk = false;
    let wasHit = false;

    if (cell.state === CELL_STATE.SHIP) {
        wasHit = true;
        newGrid[row][col].state = CELL_STATE.HIT;
        const shipIndex = newShips.findIndex(s => s.name === cell.shipName);
        if(shipIndex !== -1) {
            newShips[shipIndex].hits++;
            if (newShips[shipIndex].hits >= newShips[shipIndex].length) {
                setFeedback(t('aiSunkYourShip', { shipName: cell.shipName }));
                justSunk = true;
            } else {
                setFeedback(t('aiHit'));
            }
        }
    } else {
        newGrid[row][col].state = CELL_STATE.MISS;
        setFeedback(t('aiMiss'));
    }
    
    if (aiDifficulty !== 'easy') {
        const finalGrid = justSunk ? updateSunkShips(newGrid, newShips) : newGrid;
        if (justSunk) {
            const remainingHits = [];
            for(let r=0; r<gridSize; r++) {
                for(let c=0; c<gridSize; c++) {
                    if(finalGrid[r][c].state === CELL_STATE.HIT) {
                         remainingHits.push({row: r, col: c});
                    }
                }
            }
            if (remainingHits.length > 0) setAiTargetingInfo({ mode: 'targeting', hits: remainingHits });
            else setAiTargetingInfo({ mode: 'hunting', hits: [] });
        } else if (wasHit) {
            setAiTargetingInfo(prev => ({ mode: 'targeting', hits: [...prev.hits, { row, col }] }));
        }
        setPlayer1Grid(finalGrid);
    } else {
        setPlayer1Grid(justSunk ? updateSunkShips(newGrid, newShips) : newGrid);
    }
    
    setPlayer1Ships(newShips);
    setGameState('showing_attack_result');
  }, [gridSize, aiShots, player1Grid, player1Ships, t, aiTargetingInfo, aiDifficulty]);
  
  useEffect(() => { 
    if (gameState === 'turn_switching' && gameMode === 'single' && activePlayer === 2 && !isPaused) {
        handleAiTurn(); 
    }
  }, [gameState, gameMode, activePlayer, handleAiTurn, isPaused]);

  useEffect(() => {
    if (gameState === 'showing_attack_result' && !isPaused) {
        const timer = setTimeout(() => {
            const p1Lost = player1Ships.every(s => s.hits >= s.length);
            const p2Lost = player2Ships.every(s => s.hits >= s.length);

            if (p1Lost || p2Lost) {
                const player1Name = gameMode === 'single' ? t('you') : t('player') + ' 1';
                const player2Name = gameMode === 'single' ? t('ai') : t('player') + ' 2';
                setWinnerName(p2Lost ? player1Name : player2Name);
                setGameState('game_over');
                return;
            }
            if (gameMode === 'multiplayer') setGameState('transition');
            else {
                if (activePlayer === 1) { setActivePlayer(2); setGameState('turn_switching'); }
                else { setActivePlayer(1); setGameState('battle'); }
            }
        }, attackDelay);
        return () => clearTimeout(timer);
    }
  }, [gameState, gameMode, attackDelay, player1Ships, player2Ships, activePlayer, isPaused, t]);

  useEffect(() => {
    if (gameState === 'game_over' && gameMode === 'single') {
        const playerWon = player2Ships.every(s => s.hits >= s.length);
        const newRecord = {
            date: new Date().toISOString(),
            result: playerWon ? 'win' : 'loss',
            aiDifficulty: settings.aiDifficulty,
            turns: player1Shots,
            accuracy: player1Shots > 0 ? (player1Hits / player1Shots) * 100 : 0,
        };

        const savedHistory = localStorage.getItem('battleshipGameHistory');
        const history = savedHistory ? JSON.parse(savedHistory) : [];
        const newHistory = [newRecord, ...history].slice(0, 20); // Keep last 20 games
        localStorage.setItem('battleshipGameHistory', JSON.stringify(newHistory));
    }
  }, [gameState, gameMode, player2Ships, settings.aiDifficulty, player1Shots, player1Hits]);

  useEffect(() => {
    const player1Name = gameMode === 'single' ? t('you') : t('player') + ' 1';
    const player2Name = gameMode === 'single' ? t('ai') : t('player') + ' 2';
    const activePlayerName = activePlayer === 1 ? player1Name : player2Name;
    
    if (gameState === 'placement') {
      const ship = shipsToPlace[placementIndex];
      if (ship) setStatus(t('placeYourShip', { playerName: activePlayerName, shipName: ship.name, length: ship.length }));
    } else if (gameState === 'battle') {
        if (gameMode === 'single' && activePlayer === 2) setStatus(t('aiThinking'));
        else setStatus(t('playerTurn', { playerName: activePlayerName }));
    } else if (gameState === 'turn_switching' || gameState === 'showing_attack_result') {
        setStatus(gameMode === 'single' && activePlayer === 2 ? t('aiThinking') : t('switchingTurns'));
    } else if (gameState === 'game_over') {
        setStatus(t('gameOver'));
    }
  }, [gameState, placementIndex, activePlayer, gameMode, player2Ships, shipsToPlace, t]);

  const togglePlacementOrientation = useCallback(() => setPlacementOrientation(p => (p === 'horizontal' ? 'vertical' : 'horizontal')), []);

  useEffect(() => {
    const handleKeyPress = (e) => { if (gameState === 'placement' && (e.key === 'r' || e.key === 'R')) togglePlacementOrientation(); };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, togglePlacementOrientation]);

  useEffect(() => {
    if (gameState !== 'placement' || !hoveredCell || totalShipsToPlace === 0) { if (previewCells.length > 0) setPreviewCells([]); return; }
    const { row, col } = hoveredCell;
    const shipToPlace = shipsToPlace[placementIndex];
    if (!shipToPlace) return;

    const isHorizontal = placementOrientation === 'horizontal';
    const currentGrid = activePlayer === 1 ? player1Grid : player2Grid;
    const cells = [];
    if (isHorizontal) for (let i = 0; i < shipToPlace.length; i++) { if (col + i < gridSize) cells.push(`${row}-${col + i}`); }
    else for (let i = 0; i < shipToPlace.length; i++) { if (row + i < gridSize) cells.push(`${row + i}-${col}`); }
    const possible = canPlaceShip(currentGrid, row, col, shipToPlace.length, isHorizontal, gridSize);
    setPreviewCells(cells.map(c => ({ coord: c, possible })));
  }, [hoveredCell, placementOrientation, player1Grid, player2Grid, activePlayer, placementIndex, gameState, previewCells.length, shipsToPlace, gridSize, totalShipsToPlace]);
  
  const handleGridClickPlacement = (row, col) => {
    if (placementIndex >= totalShipsToPlace) return;
    const currentGrid = activePlayer === 1 ? player1Grid : player2Grid;
    const setGrid = activePlayer === 1 ? setPlayer1Grid : setPlayer2Grid;
    const setShips = activePlayer === 1 ? setPlayer1Ships : setPlayer2Ships;
    const ships = activePlayer === 1 ? player1Ships : player2Ships;
    const shipToPlace = ships[placementIndex];
    const isHorizontal = placementOrientation === 'horizontal';

    if (canPlaceShip(currentGrid, row, col, shipToPlace.length, isHorizontal, gridSize)) {
        setGrid(placeShip(currentGrid, row, col, shipToPlace, isHorizontal));
        setShips(s => s.map((ship, i) => i === placementIndex ? {...ship, placed: true} : ship));
        const newPlacementIndex = placementIndex + 1;
        setPlacementIndex(newPlacementIndex);
        setHoveredCell(null);

        if (newPlacementIndex >= totalShipsToPlace) {
            if (gameMode === 'multiplayer') { if (activePlayer === 1) setGameState('transition'); else { setActivePlayer(1); setGameState('battle'); } }
            else setGameState('battle');
        }
    } else {
        setFeedback(t('cannotPlaceShip', { shipName: shipToPlace.name }));
    }
  };

  const updateSunkShips = (grid, ships) => {
    const newGrid = grid.map(r => r.map(cell => ({...cell})));
    for (const sunkShip of ships.filter(s => s.hits >= s.length)) {
      for (let r = 0; r < gridSize; r++) for (let c = 0; c < gridSize; c++) if (newGrid[r][c].shipName === sunkShip.name) newGrid[r][c].state = CELL_STATE.SUNK;
    }
    return newGrid;
  };
  
  const handleGridClickBattle = (row, col) => {
    const targetGrid = activePlayer === 1 ? player2Grid : player1Grid;
    const setTargetGrid = activePlayer === 1 ? setPlayer2Grid : setPlayer1Grid;
    const targetShips = activePlayer === 1 ? player2Ships : player1Ships;
    const setTargetShips = activePlayer === 1 ? setPlayer2Ships : setPlayer1Ships;

    const cell = targetGrid[row][col];
    if ([CELL_STATE.HIT, CELL_STATE.MISS, CELL_STATE.SUNK].includes(cell.state)) return;

    if(activePlayer === 1) setPlayer1Shots(s => s + 1);

    let newGrid = targetGrid.map(r => r.map(c => ({...c})));
    let newShips = JSON.parse(JSON.stringify(targetShips));
    let message = ''; let justSunk = false;
    
    if (cell.state === CELL_STATE.SHIP) {
      if(activePlayer === 1) setPlayer1Hits(h => h + 1);
      newGrid[row][col].state = CELL_STATE.HIT;
      const shipIndex = newShips.findIndex(s => s.name === cell.shipName);
      if(shipIndex !== -1) {
          newShips[shipIndex].hits++;
          if(newShips[shipIndex].hits >= newShips[shipIndex].length) { message = t('sunkEnemyShip', { shipName: cell.shipName }); justSunk = true; }
          else { message = t('hit'); }
      }
    } else { newGrid[row][col].state = CELL_STATE.MISS; message = t('miss'); }

    setTargetGrid(justSunk ? updateSunkShips(newGrid, newShips) : newGrid);
    setTargetShips(newShips);
    setFeedback(message);
    setGameState('showing_attack_result');
  };

  const handleTransitionReady = () => {
    const isP1PlacementTransition = activePlayer === 1 && !player2Ships.some(s => s.placed);
    if (isP1PlacementTransition) { setActivePlayer(2); setPlacementIndex(0); setGameState('placement'); }
    else { const nextPlayer = activePlayer === 1 ? 2 : 1; setActivePlayer(nextPlayer); setGameState('battle'); }
  };
  
  const handleGridMouseMove = (e) => {
    if (gameState !== 'placement') return;
    const target = e.target;
    if (target.classList.contains('cell')) {
        const row = parseInt(target.dataset.row ?? '', 10); const col = parseInt(target.dataset.col ?? '', 10);
        if (!isNaN(row) && !isNaN(col) && (!hoveredCell || hoveredCell.row !== row || hoveredCell.col !== col)) setHoveredCell({ row, col });
    }
  };
  
  if (gameState === 'transition' && gameMode === 'multiplayer') {
    const isP1PlacementTransition = activePlayer === 1 && !player2Ships.some(s => s.placed);
    const message = isP1PlacementTransition ? t('p1DonePlacement') : t('turnOver', { playerNum: activePlayer === 1 ? '2' : '1' });
    const buttonText = isP1PlacementTransition ? t('p2StartPlacement') : t('playerStartTurn', { playerNum: activePlayer === 1 ? '2' : '1' });
    return <TransitionScreen message={message} buttonText={buttonText} onReady={handleTransitionReady} t={t} />;
  }
  
  const playerGrid = activePlayer === 1 ? player1Grid : player2Grid;
  const enemyGrid = activePlayer === 1 ? player2Grid : player1Grid;
  
  const getBoardTitle = () => {
      if (gameState === 'placement') return gameMode === 'single' ? t('yourFleet') : t('playerFleet', { playerNum: activePlayer });
      return gameMode === 'single' ? t('enemyFleet') : t('playerFleet', { playerNum: activePlayer === 1 ? 2 : 1 });
  }
  
  const noShipsToPlace = totalShipsToPlace === 0;
  if(gameState === 'placement' && noShipsToPlace) {
      if (gameMode === 'multiplayer' && activePlayer === 1) setGameState('transition');
      else { setGameState('battle'); if (activePlayer === 2) setActivePlayer(1); }
  }

  return (
    <div className="game-view-wrapper">
        {isPaused && <PauseMenu onResume={() => setIsPaused(false)} onBackToMenu={() => setView('menu')} t={t} />}
        {gameState === 'game_over' && <GameOverModal winnerName={winnerName} onBackToMenu={() => setView('menu')} t={t} />}
        {gameState !== 'game_over' && <button className="pause-button" onClick={() => setIsPaused(true)}>❚❚</button>}

        {showFleetModal && <FleetModal grid={player1Grid} gridSize={gridSize} onClose={() => setShowFleetModal(false)} gameState={gameState} t={t} showCoordinates={showCoordinates} />}
        <h1>{t('appTitle')}</h1>
        <div className="status-container">
            <div id="game-status">{feedback || status}</div>
            <div className="actions">
                
            </div>
        </div>
        <div className="game-container">
            <div className="board-container">
            <h2>{getBoardTitle()}</h2>
            {gameState === 'placement' && !noShipsToPlace ? (
                <GridDisplay grid={playerGrid} gridSize={gridSize} onCellClick={handleGridClickPlacement} isEnemy={false} onGridMouseMove={handleGridMouseMove} onGridLeave={() => setHoveredCell(null)} previewCells={previewCells} gameState={gameState} alwaysShowShips={true} showCoordinates={showCoordinates} />
            ) : (
                <GridDisplay grid={enemyGrid} gridSize={gridSize} onCellClick={gameState === 'battle' && (gameMode === 'single' ? activePlayer === 1 : true) ? handleGridClickBattle : () => {}} isEnemy={true} onGridMouseMove={() => {}} onGridLeave={() => {}} previewCells={[]} gameState={gameState} alwaysShowShips={false} showCoordinates={showCoordinates} />
            )}
            <div className="board-actions">
                {gameState === 'placement' && !noShipsToPlace && <button onClick={togglePlacementOrientation}>{t('rotateShip')} ({placementOrientation === 'horizontal' ? t('horizontal') : t('vertical')})</button>}
                {gameState === 'battle' && <button onClick={() => setShowFleetModal(true)}>{t('viewMyFleet')}</button>}
            </div>
            </div>
        </div>
    </div>
  );
};

const App = () => {
    const [view, setView] = useState('menu');
    const [gameId, setGameId] = useState(0);
    const [gameMode, setGameMode] = useState('single');
    const [settings, setSettings] = useState(DEFAULT_SETTINGS);
    const [language, setLanguage] = useState(localStorage.getItem('battleshipLang') || 'zh');

    useEffect(() => { localStorage.setItem('battleshipLang', language); }, [language]);

    useEffect(() => {
        const savedSettings = localStorage.getItem('battleshipSettings');
        if (savedSettings) {
            try {
                const parsed = JSON.parse(savedSettings);
                setSettings(prev => ({...DEFAULT_SETTINGS, ...parsed}));
            } catch (e) { console.error("Failed to parse settings", e); }
        }
    }, []);

    const saveSettings = (newSettings) => {
        setSettings(newSettings);
        localStorage.setItem('battleshipSettings', JSON.stringify(newSettings));
    };
    
    const startGame = (mode) => {
        setGameMode(mode);
        setGameId(prevId => prevId + 1);
        setView('game');
    };

    const toggleLanguage = () => setLanguage(l => l === 'en' ? 'zh' : 'en');
    
    const t = useCallback((key, replacements = {}) => {
        let str = translations[key]?.[language] || key;
        for (const placeholder in replacements) {
            str = str.replace(`{${placeholder}}`, replacements[placeholder]);
        }
        return str;
    }, [language]);

    const renderView = () => {
        const props = { setView, t, language };
        switch(view) {
            case 'instructions': return <Instructions {...props} />;
            case 'records': return <Records {...props} />;
            case 'settings': return <Settings initialSettings={settings} onSave={saveSettings} {...props} />;
            case 'game': return <Game key={gameId} gameMode={gameMode} settings={settings} {...props} />;
            case 'menu': default: return <MainMenu startGame={startGame} toggleLanguage={toggleLanguage} {...props} />;
        }
    };
    
    return renderView();
};

const container = document.getElementById('root');
if (container) {
    createRoot(container).render(<App />);
}