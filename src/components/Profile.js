import React from "react";
import Logo from "-!svg-react-loader!../../static/avatar.svg";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Container } from "@material-ui/core";
import { withAuth } from "../services";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import { Accordion, AccordionItem } from "./Accordion";
import { withRouter } from "react-router-dom";

const Profile = withRouter(
  withAuth(({ isAuthorized, logout }) => {
    const token = Cookies.getJSON("jwt");
    const user = jwt.decode(token);
    if (user) {
      const expiresAt = user.exp * 1000;
      if (Date.now() > expiresAt) {
        logout(history);
      }
    }
    return (
      isAuthorized && (
        <Container style={{ marginTop: 20 }}>
          <Accordion defaultIndex="2" onItemClick={console.log}>
            <AccordionItem label="user" index="2">
              <Paper
                style={{
                  margin: "50px 20%",
                  padding: "0 10% 10%",
                  maxWidth: 600
                }}
              >
                <div
                  className="CURSOR"
                  style={{
                    cursor:
                      "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6M0EwMEYyRjlDMjZFMTFFNUI4QkRFMkRBRDg3QkNFRUQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6M0EwMEYyRkFDMjZFMTFFNUI4QkRFMkRBRDg3QkNFRUQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozQTAwRjJGN0MyNkUxMUU1QjhCREUyREFEODdCQ0VFRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozQTAwRjJGOEMyNkUxMUU1QjhCREUyREFEODdCQ0VFRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pi/X/ugAAAY6SURBVHja7J1bbBVFHMZ3pVajTQoxCCgaNECqJiJV41NFCdF6CRKrvrRcXkyMD6gQE16MMSbESx9INCYkeHkywRhNiJFUoK3EqDVoRVQIiBpoQDFKC4jYtK7fZP+L0+2e6V7ncvx/ydc953S7Z+b7dWbP7O6Z9YMg8Fj26AKOgIGwGAgDYTEQBsKqQA3yE9/3C28wCLd5C3wnfCPcAl8NN8GNtNrv8M/wN/BuuAfvfNxkECj3HCzuhm+ncs+DL6Nfj8Jn4CPwASp3H7wH5R4r/N7y0EM8iVygMj7cBm+BhwOx2Wweh3fCDwYaW614L3rPnVSGrOUepjqLuvtFgJxnUAQIgVgBD+aoTC0fhDuKVDBluTvovcoq9yBl4RsBgrUXwZ+VWKG4xX/ttRXAuIa2XVW5RSaLtAHBWtPgZ+GxCisV+QzcVSKMLtpm1eUeo4ymVQoEa8yEd2moUNyb0lZO8U+0yUC5RVYzKwGC386F9xuoVOT3g/8+pWWB0Uh/a6rcIrO5pQIhGEMGKxV5WxYoBGObBeUeUkHJBASvzoC/s6BSkd9J031RN7XVonKLDGcUAkIfD3ssqlTkF1MAecHCcvckfSzOAmSDhZWK/IgCxkMWl3tDLiB41gKPWlyxkSA8vBEv97ycRwt0WWTakgfIDosrFblP7gKoi93lQLl3ZAKCR+0OVCryGqncaxwqd3sSEF8GER3txSv9WCxx5Ij1r/ACenwInuVIuT9G2nfEj/Y2JPTBrQ7B8AjAeumxK1oisgaUr2qeDyGtdPC8zpOOno8SWU8AMqHLoj7rGDybz91p0S/wFXKfFT8ZdAPD0KrZlHnNc+pLOSPtWqoCspjz0a7FKiALOR/tWqgCMp/z0a75KiBNnI92Nak+9vJ3E0woCPxaLYRlWAzEvP5RARnhfLRrRAXkBOejXScYiF0aUgE5zPlo10EVkP2cj3Z9qwKyl/PRri9VA8Nm/DzpVfhVANYE/QlPx8BwLLGF+OFHMG4l+tQb/wZW0sDwA85Jm96LvzDpqhM8uxkP93BWlUt8b3EOWsgfMoNJLcQPdzIHOK/K9a6AEX+x1rGsLZxX5Xot6cVaF8pNpxHkpZxbJfoESbdFT5RdFnVbw1hs5twq0/O1fpHYQqiViKsAD3MrKV0f+eEEBV7qFkKtRFwz2835lSox5livWmGqE1QveeEUGKxy1O3Hjl2l7rKkruseLD7kLAtLHLgVF1efm5Rxmi5L6rq2Y/EG51l4ENiZBCNrlxXpKfhHzjW3ngaMwTQrTtllSV3XTVh8Dl/E+WbS20i1U7VCpi5L6rq+xuIxzjeTxDHBR7P8QabLgADlLSxe5pxT6Si8HJmdzZRx2i5L6rrELApb4Q7OvKbEjHltfspT4rm6LKmVjHthn9jPuSfqNHyfn/P6hFxXLuLN/sZiBfwF5z9Bf4lckM9A3g3kvpSUTve2e3wyS4ZxP3LpLbKRQtf2+uEFEcu4pXin4HuLwji/QylhVtJmeMChWRTKnnPlttIYlAGEoFwC9/7PYPwG31pqoygLCEG52PB0ejp9ND6rj3VAonEK/Hqdw/h+qnkUrQFCUMR34zbWKYyBNDONWgVEAvNEzim8bfV2sa8sPSddQAiKmG7vXB3AeDNInqzHLSAERUxWf9JhGBsrnYteNxCCcj18xDEQortdW/Wo0ggQgnIlvNcRGKOqmU/rAog0qu9zYPS9TNdxF6NACEqjZbNOx0ffrToPhBkHQlDE3W1etQyGmKN9ge4jk1YAkcA8ZwmMH+CrjGRgExCCstYwjH3w5cbqbxsQgtJlaFQ/QF+/8BjIZCidmqEIGM3G620rEILygKabAFgBw3ogBGV5xVCsgeEEkIqh7DO9z3ASCEF5uOR9ivhoa91E0c4AISirS4JxXNxU0so6ugSEoKwrCONUYPEk0c4BISjdBe66eZfVdXMUiE+3zMsK5HHPcjkJhKCIy4w+zQDjFc8BOQuEoMxKeeZxN3whA9EDpRU+q4BxLHDoPijOAyEoqxTnwducqks9ACEomxOAPONcPeoIiNjJD0ow+ovcd52BlAPlOtqfnLZ1JJ4FSIPnuPzwBvLr8HAcj39yvj6utox6Fd+ugoGwGAgDYeXVvwIMAGCAb3XkplDRAAAAAElFTkSuQmCC), progress"
                  }}
                >
                  <Typography component="div">
                    <Logo />
                  </Typography>
                </div>
              </Paper>
            </AccordionItem>
            <AccordionItem label="creator" index="1">
              <Paper
                style={{
                  margin: "50px 20%",
                  padding: "0 10% 10%",
                  maxWidth: 600
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <img
                    src={user.picture}
                    alt=""
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      margin: 10
                    }}
                  />
                  <h1>{user.name}</h1>
                </div>
                <h2 style={{ textAlign: "center", margin: 0 }}>
                  {user.nickname}
                </h2>
              </Paper>
            </AccordionItem>
          </Accordion>
        </Container>
      )
    );
  })
);

export default Profile;
