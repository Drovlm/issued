

      <div className="navbar-sign">
        {isLoggedIn ? (
          <>
            {userProfile && (
              <div className="profile-pic">
                <img src={userProfile.profilePicture} alt="Profile" />
              </div>
            )}
            <div className="right-bar">
              {userProfile && (
                <>
                  <p>{userProfile.username}</p>
                  <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <p onClick={handleModalOpen}>Войти</p>
            <button className="regBTN" onClick={handleRegOpen}>Зарегистрироваться</button>
          </>
        )}

        {modalOpen && (
          <LogIn onClose={() => setModalOpen(false)} />
        )}

        {regOpen && <Register onClose={() => setRegOpen(false)} />}
      </div>




