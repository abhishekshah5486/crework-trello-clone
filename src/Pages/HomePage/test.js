            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="task-columns">
                    <Droppable droppableId="todo-tasks">
                    {/* <div className="task-column">
                        <div className="task-status">
                            <h2>To do</h2>
                            <img src={barFilterIcon} alt="" />
                        </div>
                        {todoTasks.map((task, index) => renderTaskCard(task, index))}
                        <button className="add-new-task-btn" onClick={handleAddNewTaskClick}>Add new <img src={addIcon} alt="" /></button>
                    </div> */}
                    {(provided) => (
                        <div className="task-column" ref={provided.innerRef} {...provided.droppableProps}>
                        <div className="task-status">
                            <h2>To do</h2>
                            <img src={barFilterIcon} alt="" />
                        </div>
                        {todoTasks.map((task, index) => renderTaskCard(task, index))}
                        {provided.placeholder}
                        <button className="add-new-task-btn" onClick={handleAddNewTaskClick}>Add new <img src={addIcon} alt="" /></button>
                        </div>
                    )}
                    </Droppable>

                    <Droppable droppableId="in-progress-tasks">
                    {/* <div className="task-column">
                        <div className="task-status">
                            <h2>In progress</h2>
                            <img src={barFilterIcon} alt="" />
                        </div>
                        {inProgressTasks.map((task, index) => renderTaskCard(task, index))}
                        <button className="add-new-task-btn" onClick={handleAddNewTaskClick}>Add new <img src={addIcon} alt="" /></button>
                    </div> */}
                    {(provided) => (
                        <div className="task-column" ref={provided.innerRef} {...provided.droppableProps}>
                        <div className="task-status">
                            <h2>In progress</h2>
                            <img src={barFilterIcon} alt="" />
                        </div>
                        {inProgressTasks.map((task, index) => renderTaskCard(task, index))}
                        {provided.placeholder}
                        <button className="add-new-task-btn" onClick={handleAddNewTaskClick}>Add new <img src={addIcon} alt="" /></button>
                        </div>
                    )}
                    </Droppable>

                    <Droppable droppableId="under-review-tasks">
                    {/* <div className="task-column">
                        <div className="task-status">
                            <h2>Under review</h2>
                            <img src={barFilterIcon} alt="" />
                        </div>
                        {underReviewTasks.map((task, index) => renderTaskCard(task, index))}
                        <button className="add-new-task-btn" onClick={handleAddNewTaskClick}>Add new <img src={addIcon} alt="" /></button>
                    </div> */}
                    {(provided) => (
                        <div className="task-column" ref={provided.innerRef} {...provided.droppableProps}>
                        <div className="task-status">
                            <h2>Under review</h2>
                            <img src={barFilterIcon} alt="" />
                        </div>
                        {underReviewTasks.map((task, index) => renderTaskCard(task, index))}
                        {provided.placeholder}
                        <button className="add-new-task-btn" onClick={handleAddNewTaskClick}>Add new <img src={addIcon} alt="" /></button>
                        </div>
                    )}
                    </Droppable>

                    <Droppable droppableId="finished-tasks">
                    {/* <div className="task-column">
                        <div className="task-status">
                            <h2>Finished</h2>
                            <img src={barFilterIcon} alt="" />
                        </div>
                        {finishedTasks.map((task, index) => renderTaskCard(task, index))}
                        <button className="add-new-task-btn" onClick={handleAddNewTaskClick}>Add new <img src={addIcon} alt="" /></button>
                    </div> */}
                    {(provided) => (
                        <div className="task-column" ref={provided.innerRef} {...provided.droppableProps}>
                        <div className="task-status">
                            <h2>Finished</h2>
                            <img src={barFilterIcon} alt="" />
                        </div>
                        {finishedTasks.map((task, index) => renderTaskCard(task, index))}
                        {provided.placeholder}
                        <button className="add-new-task-btn" onClick={handleAddNewTaskClick}>Add new <img src={addIcon} alt="" /></button>
                        </div>
                    )}
                    </Droppable>
                </div>
            </DragDropContext>