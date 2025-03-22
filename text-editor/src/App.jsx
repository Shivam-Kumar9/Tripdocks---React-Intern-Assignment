import React, { useState, useRef } from 'react';
import './App.css';

const VARIABLES = [
  { id: 'user_name', label: 'User Name', value: '{{shivam}}' },
  { id: 'company', label: 'Company', value: '{{Xyz.prvate.limited}}' },
  { id: 'email', label: 'Email Address', value: '{{email@gmail.com}}' },
  { id: 'date', label: 'Current Date', value: '{{12/01/25}}' },
  { id: 'subscription_plan', label: 'Subscription Plan', value: '{{patinum-user}}' },
  { id: 'account_balance', label: 'Account Balance', value: '{{$23,993}}' },
  { id: 'support_phone', label: 'Support Phone', value: '{{+91498489}}' },
  { id: 'website_url', label: 'Website URL', value: '{{www.data.com}}' }
];

function App() {
  const [text, setText] = useState('');
  const [showVariables, setShowVariables] = useState(false);
  const [filteredVariables, setFilteredVariables] = useState([]);
  const textareaRef = useRef(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setText(value);

    // Check if the user typed '{{'
    if (value.endsWith('{{')) {
      setShowVariables(true);
      setFilteredVariables(VARIABLES);
    } else if (showVariables) {
      const query = value.split('{{').pop().toLowerCase();
      const filtered = VARIABLES.filter((variable) =>
        variable.label.toLowerCase().includes(query)
      );
      setFilteredVariables(filtered);
    }
  };

  const handleVariableSelect = (variable) => {
    const textBeforeCursor = text.split('{{').slice(0, -1).join('{{');
    const newText = `${textBeforeCursor}${variable.value}`;
    setText(newText);
    setShowVariables(false);

    // Focus the textarea and move the cursor to the end
    textareaRef.current.focus();
    setTimeout(() => {
      textareaRef.current.selectionStart = textareaRef.current.selectionEnd = newText.length;
    }, 0);
  };

  return (
    <div className="App">
      <h1>Text Editor</h1>
      <div className="editor-container">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleInputChange}
          placeholder="Type here..."
          rows={10}
          cols={50}
        />
        {showVariables && (
          <div className="variables-dropdown">
            {filteredVariables.map((variable) => (
              <div
                key={variable.id}
                className="variable-item"
                onClick={() => handleVariableSelect(variable)}
              >
                {variable.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;