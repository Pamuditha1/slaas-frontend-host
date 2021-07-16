import React from "react";
import { Badge, Button } from "reactstrap";

function SelectedToEmailBadges({ selectedTo, removeselected }) {
  return (
    <div className="mr-1">
      {selectedTo.map((s) => (
        <Badge key={s} color="dark" pill>
          {s}
          <Button
            className="ml-1 rounded-circle"
            onClick={() => removeselected(s)}
          >
            X
          </Button>
        </Badge>
      ))}
    </div>
  );
}

export default SelectedToEmailBadges;
