import StatisticsArticles from 'components/statisctics/StatisticsArticles';
import StatisticsAuthors from 'components/statisctics/StatisticsAuthors';
import StatisticsReviewing from 'components/statisctics/StatisticsReviewing';
import React from 'react';

const Statistics = () => {
  return (
    <>
      <ul class="nav nav-tabs statistics_tabs">
        <li class="nav-item">
          <a class="nav-link active" data-toggle="tab" href="#description">
            Рецензенты
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-toggle="tab" href="#characteristics">
            Авторы
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-toggle="tab" href="#articles">
            Итоги рецензирования
          </a>
        </li>
      </ul>

      <div class="tab-content">
        <div class="tab-pane fade show active" id="description">
          <StatisticsReviewing />
        </div>
        <div class="tab-pane fade" id="characteristics">
          <StatisticsAuthors />
        </div>
        <div class="tab-pane fade" id="articles">
          <StatisticsArticles />
        </div>
      </div>
    </>
  );
};

export default Statistics;
